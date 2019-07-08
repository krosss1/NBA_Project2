library(shiny)

shinyServer(function(input, output, session) {
  current_player = reactive({
    req(input$player_name)
    find_player_by_name(input$player_name)
  })
  
  current_player_seasons = reactive({
    req(current_player())
    
    first = max(current_player()$from_year, first_year_of_data)
    last = current_player()$to_year
    as.character(season_strings[as.character(first:last)])
  })
  
  current_season = reactive({
    req(input$season)
    input$season
  })
  
  current_season_type = reactive({
    req(input$season_type)
    input$season_type
  })
  
  use_short_three = reactive({
    req(current_season())
    current_season() %in% short_three_seasons
  })
  
  court_theme = reactive({
    req(input$court_theme)
    court_themes[[tolower(input$court_theme)]]
  })
  
  court_plot = reactive({
    req(court_theme())
    plot_court(court_theme = court_theme(), use_short_three = use_short_three())
  })
  
  update_season_input = observe({
    req(current_player(), current_player_seasons())
    
    isolate({
      if (current_season() %in% current_player_seasons()) {
        selected_value = current_season()
      } else {
        selected_value = rev(current_player_seasons())[1]
      }
      
      updateSelectInput(session,
                        "season",
                        choices = rev(current_player_seasons()),
                        selected = selected_value)
    })
  })
  
  shots = reactive({
    req(current_player(), current_season(), current_season_type())
    req(current_season() %in% current_player_seasons())
    
    use_default_shots = all(
      current_player()$person_id == default_player$person_id,
      current_season() == default_season,
      current_season_type() == default_season_type
    )
    
    if (use_default_shots) {
      default_shots
    } else {
      fetch_shots_by_player_id_and_season(
        current_player()$person_id,
        current_season(),
        current_season_type()
      )
    }
  })
  
  filtered_shots = reactive({
    req(input$shot_result_filter, shots()$player)
    
    filter(shots()$player,
           input$shot_result_filter == "all" | shot_made_flag == input$shot_result_filter,
           shot_zone_basic != "Backcourt",
           is.null(input$shot_zone_basic_filter) | shot_zone_basic %in% input$shot_zone_basic_filter,
           is.null(input$shot_zone_angle_filter) | shot_zone_area %in% input$shot_zone_angle_filter,
           is.null(input$shot_distance_filter) | shot_zone_range %in% input$shot_distance_filter,
           is.na(input$date_range[1]) | game_date >= input$date_range[1],
           is.na(input$date_range[2]) | game_date <= input$date_range[2]
    )
  })
  
  
  output$scatter_size_slider = renderUI({
    req(input$chart_type == "Scatter")
    
    sliderInput("scatter_size",
                "Dot size",
                min = 1,
                max = 10,
                value = 4,
                step = 0.5)
  })
  
  output$scatter_alpha_slider = renderUI({
    req(input$chart_type == "Scatter")
    
    sliderInput("scatter_alpha",
                "Opacity",
                min = 0.01,
                max = 1,
                value = 0.7,
                step = 0.01)
  })
  
  shot_chart = reactive({
    req(
      filtered_shots(),
      current_player(),
      current_season(),
      input$chart_type,
      court_plot()
    )
    
    filters_applied()
    
  if (input$chart_type == "Scatter") {
      req(input$scatter_alpha, input$scatter_size)
      
      generate_scatter_chart(
        filtered_shots(),
        base_court = court_plot(),
        court_theme = court_theme(),
        alpha = input$scatter_alpha,
        size = input$scatter_size
      )
    
    }
  })
  
  output$shot_chart_css = renderUI({
    req(court_theme())
    tags$style(paste0(
      ".shot-chart-container {",
      "background-color: ", court_theme()$court, "; ",
      "color: ", court_theme()$text,
      "}"
    ))
  })
  
  output$chart_header_player = renderText({
    req(current_player())
    current_player()$name
  })
  
  output$chart_header_info = renderText({
    req(current_season(), shots())
    paste(current_season(), current_season_type())
  })
  
  output$chart_header_team = renderText({
    req(shots()$player)
    paste0(unique(shots()$player$team_name), collapse = ", ")
  })
  
  output$shot_chart_footer = renderUI({
    req(shot_chart())

  })
  
  output$download_link = renderUI({
    req(shot_chart())
    
    filename_parts = c(
      current_player()$name,
      current_season(),
      "Shot Chart",
      input$chart_type
    )
    fname = paste0(gsub("_", "-", gsub(" ", "-", tolower(filename_parts))), collapse = "-")
      })
  
  output$player_photo = renderUI({
    if (input$player_name == "") {
      tags$img(src = "https://i.imgur.com/hXWPTOF.png", alt = "photo")
    } else if (req(current_player()$person_id)) {
      tags$img(src = player_photo_url(current_player()$person_id), alt = "photo")
    }
  })
  
  output$court = renderPlot({
    req(shot_chart())
    withProgress({
      shot_chart()
    }, message = "Calculating...")
  }, height = 600, width = 800, bg = "transparent")
  
  filters_applied = reactive({
    req(filtered_shots())
    filters = list()
    
    if (!is.null(input$shot_zone_basic_filter)) {
      filters[["Zone"]] = paste("Zone:", paste(input$shot_zone_basic_filter, collapse = ", "))
    }
    
    if (!is.null(input$shot_zone_angle_filter)) {
      filters[["Angle"]] = paste("Angle:", paste(input$shot_zone_angle_filter, collapse = ", "))
    }
    
    if (!is.null(input$shot_distance_filter)) {
      filters[["Distance"]] = paste("Distance:", paste(input$shot_distance_filter, collapse = ", "))
    }
    
    if (input$shot_result_filter != "all") {
      filters[["Result"]] = paste("Result:", input$shot_result_filter)
    }
    
    if (!is.na(input$date_range[1]) | !is.na(input$date_range[2])) {
      dates = format(input$date_range, "%m/%d/%y")
      dates[is.na(dates)] = ""
      
      filters[["Dates"]] = paste("Dates:", paste(dates, collapse = "-"))
    }
    
    filters
  })
  
  output$shot_filters_applied = renderUI({
    req(length(filters_applied()) > 0)
    
    div(class = "shot-filters",
        tags$h5("Shot Filters Applied"),
        lapply(filters_applied(), function(text) {
          div(text)
        })
    )
  })
 })

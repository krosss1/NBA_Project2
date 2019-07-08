library(shiny)
library(ggplot2)
library(dplyr)
library(httr)
library(jsonlite)

source("helpers.R")
source("court_themes.R")
source("plot_court.R")
source("players_data.R")
source("shot_data.R")
source("scatter_chart.R")


shinyUI(
  fixedPage(
      tags$head(
      tags$link(rel = "stylesheet", type = "text/css", href = "shared/selectize/css/selectize.bootstrap3.css"),
      tags$link(rel = "stylesheet", type = "text/css", href = "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css"),
      tags$link(rel = "stylesheet", type = "text/css", href = "custom_styles.css"),
      tags$script(src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"),
      tags$script(src = "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/js/bootstrap-select.min.js"),
      tags$script(src = "shared/selectize/js/selectize.min.js"),
      tags$script(src = "main.js"),
      uiOutput("shot_chart_css"),
      includeScript("")
    ),
    
    HTML('
      <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
          <div>
            <ul class="nav navbar-nav col-xs-12">
              <li class="col-xs-8 col-md-9">
              </li>
            </ul>
          </div>
        </div>
      </nav>
    '),
    
    fixedRow(class = "primary-content",
             div(class = "col-sm-8 col-md-9",
                 div(class = "shot-chart-container",
                     div(class = "shot-chart-header",
                         h2(textOutput("chart_header_player")),
                         h4(textOutput("chart_header_info")),
                         h4(textOutput("chart_header_team"))
                     ),
                     plotOutput("court", width = 800, height = "auto"),
                     uiOutput(""),
                     uiOutput("")
                 ),
                 uiOutput("")
             ),
                 div(class = "col-sm-4 col-md-3",
                 div(class = "shot-chart-inputs",
                     uiOutput("player_photo"),
                     
                     selectInput(inputId = "player_name",
                                 label = "Player",
                                 choices = c("Enter a player..." = "", available_players$name),
                                 selected = default_player$name,
                                 selectize = FALSE),
                     
                     selectInput(inputId = "season",
                                 label = "Season",
                                 choices = rev(default_seasons),
                                 selected = default_season,
                                 selectize = FALSE),
                     
                     radioButtons(inputId = "season_type",
                                  label = "Season Type",
                                  choices = c("Regular Season"),
                                  selected = default_season_type),
                     
                     dateRangeInput(inputId = "date_range",
                                    label = "Date range",
                                    start = FALSE,
                                    end = FALSE),
                     
                     radioButtons(inputId = "court_theme",
                                  label = "Theme",
                                  choices = c("Light"),
                                  selected = "Light"),
                     
                     radioButtons(inputId = "chart_type",
                                  label = "Chart Type",
                                  choices = c("Scatter"),
                                  selected = "Scatter"),

                     
                     uiOutput("scatter_size_slider"),
                     uiOutput("scatter_alpha_slider"),
                     
                     
                     selectInput(inputId = "shot_result_filter",
                                 label = "FG Made/Missed",
                                 choices = c("All" = "all", "Made" = "made", "Missed" = "missed"),
                                 selected = "all",
                                 selectize = FALSE)
                 )
             )
    )
  )
)
rm(list=ls())

# Working directory
path_root <- "/Users/j.zuchuat/Documents/GitHub/JeremyZuchuat.github.io/map/" 
path_GPX <- paste(path_root,"/gpx/simplified/",sep="") 

# Main path
setwd(path_root)

# Info on tours
info_touring <- read.csv("information/info_touring.csv",sep=",")

# List GPX files
list_GPX <- list.files(path = path_GPX)
list_GPX <- list_GPX[substr(list_GPX,nchar(list_GPX)-3,nchar(list_GPX)) == ".gpx"]
list_GPX <- substr(list_GPX,1,nchar(list_GPX)-4)

# Printing only two decimals
print_decimal <- function(x, d=2) sprintf(paste0("%1.",d,"f"), x) 

# Generic HTML 
render_report <- function(tour) {
  
  template <- paste(path_root,"script/ski_tour_html.Rmd", sep="")
  
  out_file <- tour # sprintf("report %s vs. %s", var2, var1)
  
  parameters <- list(variable1 = tour)
  
  rmarkdown::render(template,
                    output_file = out_file,
                    params = parameters)
  invisible(TRUE)
}

# Generate all HTML
#render_report(list_GPX[2])
paste(path_root,"script/ski_tour_html.Rmd", sep="")

template <- paste(path_root,"script/ski_tour_html.Rmd", sep="")


rmarkdown::render(template,output_file = list_GPX[2],params= ls(list_GPX[2]))


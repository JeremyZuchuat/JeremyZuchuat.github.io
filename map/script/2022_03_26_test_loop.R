
####
## SETUP R
####

# Packages 
library(readxl)
library(rmarkdown)
library(raster)
library(rasterVis)
library(rgdal)
library(ggplot2)
library(rasterpdf)
library(grImport)
library(plotKML)
library(geosphere)
library(xml2)

knitr::opts_chunk$set(echo = TRUE)

# Working directory
path_root <- "/Users/j.zuchuat/Documents/GitHub/JeremyZuchuat.github.io/map" 
path_HTML <- "../ski_touring_html"
path_GPX <- paste(path_root,"/gpx/simplified/",sep="") 

# Main path
setwd(path_root)

# Info on tours
info_touring <- read.csv("information/info_touring.csv",sep=",")

# List GPX files
list_GPX <- list.files(path = path_GPX)
list_GPX <- list_GPX[substr(list_GPX,nchar(list_GPX)-3,nchar(list_GPX)) == ".gpx"]
list_GPX <- substr(list_GPX,1,nchar(list_GPX)-4)

# Palette raster
pal <- colorRampPalette(c(rgb(0.1,0.1,0.1),rgb(1,1,1)))

# Printing only two decimals
print_decimal <- function(x, d=2) sprintf(paste0("%1.",d,"f"), x) 

# Function status 
print_status <- function(x) {
  message(x)
}



setwd("/Users/j.zuchuat/Documents/GitHub/JeremyZuchuat.github.io/map/script")
#for (k in 1:length(list_GPX)){
for (k in 2:2){
  file_output <- paste0("../","html_pages/ski_touring/",list_GPX[k],".html")
  rmarkdown::render("2022_03_26_test_loop_markdown.Rmd", output_file = file_output)
  rawHTML <- paste(readLines(file_output), collapse="\n")
  splitHMTL <- strsplit(rawHTML, split="\n")[[1]]
  splitHMTL[6] <- '<link rel="stylesheet" href="../../../assets/css/0_main.css" />'
  modifiedHTML <- paste(paste(splitHMTL,rep("\n", time = length(splitHMTL))), collapse="")
  write(modifiedHTML, file = file_output,append = FALSE, sep = " ")
}



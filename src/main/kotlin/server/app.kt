package server

import com.google.gson.Gson
import spark.Request
import spark.Response
import spark.Spark
import spark.kotlin.*

fun main() {
    staticFiles.location("/public")
    port(5000)

    get("/") { handleHome(response, request) }
    get("/game") { handleGame(response, request) }
    get("/editor") { handleEditor(response, request)  }
    post("/editor/add") {  } // dodanie danych levelu
    post("/editor/load") {  } // pobranie danych levelu
}

// routeFunc

fun handleHome(response: Response, request: Request){
    response.redirect("/home/index.html")
}

fun handleEditor(response: Response, request: Request){
    response.redirect("/editor/index.html")
}

fun handleGame(response: Response, request: Request){
    response.redirect("/game/index.html")
}

// utils

fun getParam(req: Request, name: String): String?{
    if (!req.queryParams().contains(name)){
        return null
    }
    return req.queryParams(name)
}

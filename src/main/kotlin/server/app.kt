package server

import com.google.gson.Gson
import spark.Request
import spark.Response
import spark.kotlin.*

fun main() {
    staticFiles.location("/public")
    port(5000)

//    get("/") {  } // get pliku index.html
//    get("/game") {  } // get pliku game.html
//    get("/editor") {  } // get pliku editor.html
    post("/add") {  } // dodanie danych levelu
    post("/load") {  } // pobranie danych levelu
}

// routeFunc

// utils

fun getParam(req: Request, name: String): String?{
    if (!req.queryParams().contains(name)){
        return null
    }
    return req.queryParams(name)
}

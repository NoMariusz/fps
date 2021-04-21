package server

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import server.data.Level
import server.data.LevelItem
import spark.Request
import spark.Response
import spark.Spark
import spark.kotlin.*

val levels = mutableListOf<Level>()

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

fun handleAddLevel(response: Response, request: Request){
    val type = object : TypeToken<Level>() {}.type
    try{
        val lvl: Level = Gson().fromJson(request.body(), type)
        levels.add(lvl)
    } catch (e: Exception){
        response.body(Gson().toJson(e))
        response.status(400)
        return
    }
    response.status(200)
}

fun handleGetLevel(response: Response, request: Request){
    response.body(Gson().toJson(levels.last()))
    response.status(200)
}

// utils

fun getParam(req: Request, name: String): String?{
    if (!req.queryParams().contains(name)){
        return null
    }
    return req.queryParams(name)
}

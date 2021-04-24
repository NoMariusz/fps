package server

import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import server.data.Level
import server.data.LevelDeserializer
import server.data.LevelItem
import spark.Request
import spark.Response
import spark.Spark
import spark.kotlin.*

var actualLevel: Level? = null

fun main() {
    staticFiles.location("/public")
    port(5000)

    get("/") { handleHome(response, request) }
    get("/game") { handleGame(response, request) }
    get("/editor") { handleEditor(response, request)  }
    post("/editor/add") { handleAddLevel(response, request) }
    get("/editor/load") { handleGetLevel(response, request) }
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

fun handleAddLevel(response: Response, request: Request): String {
    try{
        val gSon = GsonBuilder().registerTypeAdapter(Level::class.java, LevelDeserializer()).create()
        actualLevel = gSon.fromJson(request.body(), Level::class.java)
        println(actualLevel.toString())
    } catch (e: Exception){
        return sendRes(response, Gson().toJson(e), 400)
    }
    return sendRes(response, "success", 200)
}

fun handleGetLevel(response: Response, request: Request): String {
    val jsonLevel = Gson().toJson(actualLevel)
    return sendRes(response, jsonLevel, 200)
}

// utils

fun getParam(req: Request, name: String): String?{
    if (!req.queryParams().contains(name)){
        return null
    }
    return req.queryParams(name)
}

fun sendRes(response: Response, data: String, code: Int): String {
    response.header("Access-Control-Allow-Origin", "*")
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    response.body(data)
    response.status(code)
    return data
}

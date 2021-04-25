package server.data

import com.google.gson.*
import com.google.gson.reflect.TypeToken
import java.lang.reflect.Type

class LevelDeserializer : JsonDeserializer<Level> {

    override fun deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): Level {
        json as JsonObject

        val size = json.get("size").asInt
        val type = object : TypeToken<List<LevelItem>>() {}.type
        val list: MutableList<LevelItem> = Gson().fromJson(json.get("items").asJsonArray, type)

        return Level(size, list)
    }
}
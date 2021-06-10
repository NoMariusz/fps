package server

import java.sql.Connection
import java.sql.DriverManager

class DbManager {

    init {
        // make table if it is necessary
        makeSql("CREATE TABLE IF NOT EXISTS scores (id serial primary key, score INT, time timestamp default CURRENT_TIMESTAMP);")
    }

    private fun makeConn(): Connection {
        return DriverManager.getConnection(
            "jdbc:postgresql://localhost/fps", "postgres", "zaq1@WSX"
        ) ?: throw Exception("Can't connect to postgres database")
    }

    private fun makeSql(sql: String){
        val conn = makeConn()
        val stmt = conn.createStatement()
        // execute
        try{
            stmt.execute(sql)
        } catch (e: Exception) {
            println(e.message)
        }
    }

    fun saveScore(score: Int){
        makeSql("INSERT INTO scores (score) values ($score);")
    }
}
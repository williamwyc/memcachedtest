var express = require('express');
var router = express.Router();
var utf8 = require('utf8');

router.get('/',function(req,res){
    db = req.app.locals.db
    data = req.query
    club = data.club
    pos = data.pos
    db.query('SELECT Player, GS, A FROM assists WHERE Club =\"'+club+'\"and Pos =\"'+pos+"\"",function(err,result,fields){
        if(err){
            console.log(err)
        }
        else{
            var player = ''
            var goal = -1
            var assist = -1
            var total = 0
            var count = result.length
            for(var i = 0; i<result.length; i++){
                var p = result[i]
                total += p.A
                if(p.A > assist || (p.A == assist && p.GS > goal)){
                    assist = p.A
                    goal = p.GS
                    player = p.Player
                }
            }
            var avg = total/count
            json = {
                'club': club,
                'pos': pos,
                'max_assists': assist,
                'player': player.toString('utf8'),
                'avg_assists': avg
            }
            console.log(json)
            res.json(json)
        }
    })
})

module.exports = router;
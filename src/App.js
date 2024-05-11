import { useState } from "react";
import "./App.css"
var x = 0;
var correct_words = 0 ;
var wrong_words = 0;
var wrong_letters = 0;
var letter_count = 0;
var correct_letters = 0;
var word_count = 0;
var words = []
var letters = "";

function display_words(){
    document.getElementById("text").innerHTML = "";
    if(word_count == 0){
        for(let i = word_count ; i<word_count+20;i++){
            document.getElementById("text").innerHTML += `<span id="word${i}">${words[i]}</span>`;
            letters+=words[i];
        }
    }
    else{
        for(let i = word_count ; i<word_count+20;i++){
            document.getElementById("text").innerHTML += `<span id="word${i}">${words[i]}</span>`;
        }
    }
}

function App(){
    var [val,setVal] = useState(""); 
    var [result,setRes] = useState(); 
    const change_val = (e) =>{
        document.getElementById(`word${word_count}`).style.textDecoration = "underline";
        if(word_count == 0 && e.target.value.length == 1){
            setRes();
            setTimeout(()=>{

                setRes(<div>
                    <h1 id="rehead">{correct_letters/5} Wpm</h1>
                    <span className="labels">correct letters :</span><span className="correct">{correct_letters}</span>
                    <span className="labels">wrong letters :</span><span className="wrong">{wrong_letters}</span><br/>
                    <span className="labels">correct words :</span><span className="correct">{correct_words}</span>
                    <span className="labels">wrong words :</span><span className="wrong">{wrong_words}</span><br/>
                    </div>
            );
                document.getElementsByTagName("input")[0].disabled = true;
                document.getElementById("text").innerHTML = `<center><h2>⟳</h2></center>`;
                word_count =0;
                correct_words=0;
                letter_count = 0;
                wrong_words = 0;
                wrong_letters = 0;
                correct_letters = 0;
                x=0;
                setVal("");
            },60000)
        }
        if(e.target.value !== " "){
            setVal(e.target.value);
        }
    }
    const inputKeyPress = (e)=>{
        if (e.key === " "){
            if(words[word_count] === val){
                document.getElementById(`word${word_count}`).style.color = "green"; 
                document.getElementById(`word${word_count}`).style.textDecoration = "none";
                setVal('');
                correct_words++;
                correct_letters +=words[word_count].length;
                word_count++;
            }
            else{
                document.getElementById(`word${word_count}`).style.color = "red";
                wrong_words++;
                document.getElementById(`word${word_count}`).style.textDecoration = "none";
                setVal('');
                for(let i = 0 ; i < words[word_count].length ;i++){
                    if(words[word_count][i] == val[i]){
                        correct_letters++;
                        continue;
                    }
                    wrong_letters++;
                }
                if(words[word_count].length <val.length){
                    wrong_letters += val.length-words[word_count].length;
                }
                word_count++;
                
            }
        }
        if(word_count%9 == 0){
            display_words();
        }
    }

    if(x===0){
        fetch("https://random-word-api.herokuapp.com/word?number=200")
        .then(response=>response.json())
        .then(data =>{
        words=data; 
        document.getElementsByTagName("input")[0].disabled = false;
        display_words();
        })
        x++;
    }
    return(
        <center>
            <input type="text" id="t" disabled placeholder="start typing ..." value={val} onKeyDown={(e)=>inputKeyPress(e)} onChange={(e) => {change_val(e);}} autoFocus/>
            {result}
        </center>
    )
}

export default App;

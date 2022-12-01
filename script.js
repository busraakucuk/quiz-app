function Soru (soruMetni, secenekler, dogruCevap) {
    this.soruMetni = soruMetni;
    this.secenekler = secenekler;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.kontrol = function(cevap) {
        return cevap === this.dogruCevap
    }

let sorular = [
    new Soru("1-Hangisi javascript paket yönetim uygulasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" , d: "Nuget" }, "c"),
    new Soru("2-Hangisi frontend kapsamında değerlendirilmez?", { a: "css", b: "html", c: "javascipt", d: "sql" }, "d"),
    new Soru("3-Hangisi backend kapsamında değerlendirilir?", { a: "node.js", b: "typescript", c: "angular", d: "react" }, "a"),
    new Soru("4-Hangisi javascript programlama dilini kullanmaz?", { a: "react", b: "angular", c: "vuejs", d: "asp.net" }, "d")
];

function Quiz(sorular) {
    this.sorular = sorular;
    this.soruIndex = 0;
    this.dogruCevapSayisi = 0;
}

Quiz.prototype.soruGetir = function (){
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz(sorular);

document.querySelector(".btn_start").addEventListener("click", function() {
    if(quiz.sorular.length != quiz.soruIndex){
        document.querySelector(".quiz-box").classList.add("active");
        document.querySelector(".btn_start").classList.add("passive");

        document.querySelector(".next-btn").classList.remove("show");
        soruSayisi(quiz.soruIndex +1 ,quiz.sorular.length);
        soruGoster(quiz.soruGetir(sorular));
    } else {
        console.log("quiz bitti")
    }
})

document.querySelector(".btn-restart").addEventListener("click", function() {
    document.querySelector(".sonucEkrani").classList.remove("active");

    if(quiz.sorular.length != quiz.soruIndex){
        document.querySelector(".quiz-box").classList.add("active");
        document.querySelector(".btn_start").classList.add("passive");

        document.querySelector(".next-btn").classList.remove("show");
        soruSayisi(quiz.soruIndex +1 ,quiz.sorular.length);
        soruGoster(quiz.soruGetir(sorular));
    } else {
        console.log("quiz bitti")
    }
})


document.querySelector(".btn-quit").addEventListener("click", function() {
    window.location.reload();
})

document.querySelector(".next-btn").addEventListener("click", function() {
    if(quiz.sorular.length != quiz.soruIndex +1){
        quiz.soruIndex +=1;
        soruGoster(quiz.soruGetir(sorular));
        soruSayisi(quiz.soruIndex +1,quiz.sorular.length);
        document.querySelector(".next-btn").classList.remove("show");

    } else {
        console.log("quiz bitti");
        
        document.querySelector(".sonucEkrani").classList.add("active");
        document.querySelector(".quiz-box").classList.remove("active");
        sonucEkrani(quiz.dogruCevapSayisi, quiz.sorular.length)
    }
})


const optionList = document.querySelector(".option-list");
const correctIcon = '<div class="icon"><i class="fas fa-check"></i></div>';
const incorrectIcon = '<div class="icon"><i class="fas fa-times"></i></div>';

function soruGoster(soru) {
    let question = `<span>${soru.soruMetni}</span>`;
    let options = ``;

    for(let cevap in soru.secenekler){
        options +=
        `
            <div class = "option">
                <span><b>${cevap}</b>: ${soru.secenekler[cevap]} </span>
            </div>
        `
    }

    document.querySelector(".question-text").innerHTML = question;
    optionList.innerHTML = options;
    
    const option = optionList.querySelectorAll(".option");

    for(let opt of option){
        opt.setAttribute("onclick", "optionSelected(this)")
    }
    

}

function optionSelected(option){
    let myAnswer = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();

    document.querySelector(".next-btn").classList.add("show");


    if(soru.kontrol(myAnswer)) {
        option.classList.add("correct");
        quiz.dogruCevapSayisi += 1;
        option.insertAdjacentHTML("beforeend", correctIcon);

    }else{
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", incorrectIcon)

    }
    for( let i = 0; i < optionList.children.length; i++){
        optionList.children[i].classList.add("disabled");
    }

}

function soruSayisi(soruIndexi, totalSoru){
    let soruBtn = `<span class="badge bg-warning">${soruIndexi}/${totalSoru}</span>`;
    document.querySelector(".quiz-box .soruSayisi").innerHTML = soruBtn;
}

function sonucEkrani(dogruSayisi, tsoruSayisi){
    let text = `Toplam ${tsoruSayisi} sorudan ${dogruSayisi} tanesini doğru cevapladınız.`;
    document.querySelector(".sonucEkrani .sonucText").innerHTML = text;
}
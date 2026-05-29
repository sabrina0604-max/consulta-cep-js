//selecionando variaveis
const btnBuscar = document.querySelector("#btn-buscar");
const btnLimpar = document.querySelector("#btn-limpar")

const insiraCep = document.querySelector("#cep");

const resultado = document.querySelectorAll(".inputs-resultado p");

const campos = [
    "cep",
    "logradouro",
    "bairro",
    "localidade",
    "uf"
];

const cep = insiraCep.value;


//criando funções
function buscar(){
    const cep = insiraCep.value;

    if(cep.length !== 8){
        alert("CEP inválido!");
        limpar();
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)

    .then((resposta) =>{
        return resposta.json();
    })

    .then ((dados) =>{ 

        if(dados.erro){
            alert("CEP não encontrado");
            limpar();
            return;
        }

        campos.forEach((campo, index) => {
            resultado[index].innerText = dados[campo];
        });
    });
}

function limpar(){
    resultado.forEach((item) =>{
        item.innerText = "";
    })
    insiraCep.value = "";
}

function validarDigitos(text){
    return text.replace(/[^0-9]/g, "");
};

//adicionando eventos

insiraCep.addEventListener("input", () => {
    insiraCep.value = validarDigitos(insiraCep.value);

    if(insiraCep.value === ""){
        limpar();
    };
});

btnBuscar.addEventListener("click", (e) =>{
    e.preventDefault();
    buscar();
});

insiraCep.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        buscar();
    };
});

btnLimpar.addEventListener("click", (e) =>{
    e.preventDefault();
    limpar();
})
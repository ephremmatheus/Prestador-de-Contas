const dataNoTitulo = document.querySelector('.data_atual');
const inputDataElements = document.querySelectorAll('.input_data');

const diaRec = document.querySelector('.input-r_data_value')
const descRec = document.querySelector('.input-r_desc_value')
const valRec = document.querySelector('.input-r_valor_value')

const diaDes = document.querySelector('.input-d_data_value')
const descDes = document.querySelector('.input-d_desc_value')
const valDes = document.querySelector('.input-d_valor_value')

const tbody = document.querySelector('.tbody');

const btnReceita = document.querySelector('.btnReceita')
const btnDespesa = document.querySelector('.btnDespesa')


function criaLinhaTabela(dia, desc, val){
    /*cria tr e td*/
    const tr = document.createElement('tr');

    const armazenaValores = [];
    armazenaValores.push(dia, desc, val);

    for (let valor of armazenaValores){
        const td = document.createElement('td');
        const tdTxt = document.createTextNode(valor);
        td.appendChild(tdTxt)
        tr.appendChild(td)
    }
    tbody.appendChild(tr);
}


function adicionaData(mes, ano){
    const dataFormatada = mes <= 10? `0${mes}/${ano}` : `${mes}/${ano}`;
    dataNoTitulo.innerText = dataFormatada;

    for (let elemento of inputDataElements){
        elemento.innerText = dataFormatada;
    }
    
}

function data(){
    const data = new Date();
    const mes = data.getMonth();
    const ano = data.getFullYear();  
    adicionaData(mes+1, ano);
}



document.addEventListener('DOMContentLoaded', data)

btnReceita.addEventListener('click', function (e){
    if (diaRec.value && descRec.value && valRec.value != 0){
        if (isNaN(diaRec.value) || diaRec.value >31){
            alert('Verifique os valores e tente novamente.');
            
        }
        else{
            const diaRecValue = diaRec.value;
            const descRecValue = descRec.value;
            const valRecValue = valRec.value;

            criaLinhaTabela(diaRecValue, descRecValue, valRecValue);
        }
    } else{
        alert('Verifique se digitou todas as opções e tente novamente')
    }
})
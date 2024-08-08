const dataNoTitulo = document.querySelector('.data_atual');
const inputDataElements = document.querySelectorAll('.input_data');

const diaRec = document.querySelector('.input-r_data_value')
const descRec = document.querySelector('.input-r_desc_value')
const valRec = document.querySelector('.input-r_valor_value')

const diaDes = document.querySelector('.input-d_data_value')
const descDes = document.querySelector('.input-d_desc_value')
const valDes = document.querySelector('.input-d_valor_value')


const thead1 = document.querySelector('.thead1');
const thead0 = document.querySelector('.thead0');

const tbody1 = document.querySelector('.tbody1');
const tbody0 = document.querySelector('.tbody0');

const btnReceita = document.querySelector('.btnReceita')
const btnDespesa = document.querySelector('.btnDespesa')


function limpaInput(dia, desc, val){
    dia.value = '';
    desc.value = '';
    val.value = '';
}


function criaLinhaTabela(dia, desc, val, RecOuDes){
    /*cria tr e td*/
    const tr = document.createElement('tr');

    const tdApaga = document.createElement('td');
    const tdApagaTxt = document.createTextNode('X');

    tdApaga.style.cursor = 'pointer';
    tdApaga.style.color = 'red';

    tdApaga.appendChild(tdApagaTxt);


    const armazenaValores = [];
    armazenaValores.push(dia, desc, val);

    for (let valor of armazenaValores){
        const td = document.createElement('td');
        const tdTxt = document.createTextNode(valor);
        td.appendChild(tdTxt)
        td.setAttribute('class', 'tdDado');
        tr.appendChild(td);
        
    }

    tr.appendChild(tdApaga);


    if (RecOuDes == 0){
        tbody0.appendChild(tr);
    } else{
        tbody1.appendChild(tr);
    }
    
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
            const  RecOuDes = 1; //Passa 'positivo' para saber que será adicionada a linha em 'Receitas'

            criaLinhaTabela(diaRecValue, descRecValue, valRecValue,  RecOuDes);
            limpaInput(diaRec, descRec, valRec);
        }
    } else{
        alert('Verifique se digitou todas as opções e tente novamente')
    }
})


btnDespesa.addEventListener('click', function (e){
    if (diaDes.value && descDes.value && valDes.value != 0){
        if (isNaN(diaDes.value) || diaDes.value >31){
            alert('Verifique os valores e tente novamente.');
            
        }
        else{
            const diaDesValue = diaDes.value;
            const descDesValue = descDes.value;
            const valDesValue = valDes.value;
            const  RecOuDes = 0; //Passa 'Negativo' para saber que será adicionada a linha em 'Despesas'

            criaLinhaTabela(diaDesValue, descDesValue, valDesValue, RecOuDes);
            limpaInput(diaDes, descDes, valDes);
        }
    } else{
        alert('Verifique se digitou todas as opções e tente novamente')
    }
})

document.addEventListener('click', function(e){
    const alvo = e.target;
    const alvoPai = alvo.parentElement;
    if (alvo.innerText == 'X'){
        alvoPai.remove();
    }
})
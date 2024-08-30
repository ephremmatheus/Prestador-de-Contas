/*
CORRIGIR DATA DA TABELA
ADICIONAR SOMADOR

 */

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

const captionR = document.querySelector('.captionR');
const captionD = document.querySelector('.captionD');


const tbody1 = document.querySelector('.tbody1');
const tbody0 = document.querySelector('.tbody0');

const btnReceita = document.querySelector('.btnReceita')
const btnDespesa = document.querySelector('.btnDespesa')

const valorTotalRec = document.querySelector('.valorTotalRec');
const valorTotalDes = document.querySelector('.valorTotalDes');

const valor = document.querySelector('.valor');

const btnPrint = document.querySelector('.btn-print');

let totalRec = 0;
let totalDes = 0;
let total = 0;

function valorTotal(val, recOuDes){
    if(recOuDes){
        totalRec += Number(val);
        valorTotalRec.innerText = totalRec;
    } else{
        totalDes += Number(val);
        valorTotalDes.innerText = totalDes;
    }
    total = totalRec - totalDes;
    valor.innerText = total.toFixed(2)
    
}

function apagador(val, recOuDes){
    const tdApaga = document.createElement('td');
    const tdApagaTxt = document.createTextNode('X');

    tdApaga.style.cursor = 'pointer';
    tdApaga.style.color = 'red';

    tdApaga.setAttribute('class', 'print');

    // Adiciona os atributos ao botão "X"
    tdApaga.setAttribute('data-value', val);  // Armazena o valor da linha
    tdApaga.setAttribute('data-type', recOuDes);  // Armazena o tipo de transação (0 para despesa, 1 para receita)

    tdApaga.appendChild(tdApagaTxt);

    return tdApaga;
}

function limpaInput(dia, desc, val){
    dia.value = '';
    desc.value = '';
    val.value = '';
}


function criaLinhaTabela(dia, desc, val, recOuDes){
    const tr = document.createElement('tr');
    const tdApaga = apagador(val, recOuDes);  // Passa o valor e o tipo para a função apagador

    const armazenaValores = [dia, desc, val];

    for (let valor of armazenaValores){
        const td = document.createElement('td');
        const tdTxt = document.createTextNode(valor);
        td.appendChild(tdTxt);
        td.setAttribute('class', 'tdDado');
        tr.appendChild(td);
    }

    tr.appendChild(tdApaga);

    if (recOuDes == 0){
        tbody0.appendChild(tr);  // Adiciona em despesas
    } else {
        tbody1.appendChild(tr);  // Adiciona em receitas
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
    if (mes+1 <10){
        return `0${mes+1}`
    } else{
        return mes+1;
    }
}



btnPrint.addEventListener('click', function(){
    window.print();
})

document.addEventListener('DOMContentLoaded', data)

btnReceita.addEventListener('click', function (e){
    if (diaRec.value && descRec.value && valRec.value != 0){
        if (isNaN(diaRec.value) || diaRec.value >31){
            alert('Verifique os valores e tente novamente.');
            
        }
        else{
            if (diaRec.value <10 && !diaRec.value.includes('0')){
                diaRec.value = `0${diaRec.value}/${data()}`;
            } else{
                diaRec.value = `${diaRec.value}/${data()}`;
            }
            const diaRecValue = diaRec.value;
            const descRecValue = descRec.value;
            const valRecValue = valRec.value;
            const  RecOuDes = 1; //Passa 'positivo' para saber que será adicionada a linha em 'Receitas'

            
            criaLinhaTabela(diaRecValue, descRecValue, valRecValue,  RecOuDes);
            limpaInput(diaRec, descRec, valRec);
            valorTotal(valRecValue, 1);
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
            if (diaDes.value <10 && !diaDes.value.includes('0')){
                diaDes.value = `0${diaDes.value}/${data()}`;
            } else{
                diaDes.value = `${diaDes.value}/${data()}`;
            }
            const diaDesValue = diaDes.value;
            const descDesValue = descDes.value;
            const valDesValue = valDes.value;
            const  RecOuDes = 0; //Passa 'Negativo' para saber que será adicionada a linha em 'Despesas'

            criaLinhaTabela(diaDesValue, descDesValue, valDesValue, RecOuDes);
            limpaInput(diaDes, descDes, valDes);
            valorTotal(valDesValue, 0);
        }
    } else{
        alert('Verifique se digitou todas as opções e tente novamente')
    }
})

document.addEventListener('click', function(e){
    const alvo = e.target;
    const alvoPai = alvo.parentElement;

    if (alvo.innerText == 'X'){
        const valorApagado = Number(alvo.getAttribute('data-value'));  // Obtém o valor armazenado no botão "X"
        const tipo = Number(alvo.getAttribute('data-type'));  // Obtém o tipo (0 para despesa, 1 para receita)

        // Subtrai o valor do total correspondente
        if (tipo === 1) {
            totalRec -= valorApagado;
            valorTotalRec.innerText = totalRec;
            total = total - valorApagado;
            valor.innerText = total;
        } else {
            totalDes -= valorApagado;
            valorTotalDes.innerText = totalDes;
            total = total + valorApagado;
            valor.innerText = total;
        }

        // Remove a linha da tabela
        alvoPai.remove();
    }
});

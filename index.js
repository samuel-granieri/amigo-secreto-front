const form = document.getElementById("form_amigo_secreto")

let editMode = false;

let id = 0;

if(form){
    form.addEventListener('submit', async(e)=>{
        //e.preventDefault();
    
        const nome = document.getElementById('nome').value;
        const sapato = document.getElementById('sapato').value;
        const blusa = document.getElementById('blusa').value;
        const calca = document.getElementById('calca').value;
        const observacoes = document.getElementById('observacoes').value;
        
        if(nome == null || nome == ''){
            e.preventDefault()
            alert("Campo nome é obrigatório!");
            return
            
        }
   
      
        if (!editMode){

            data = {
                nome: nome,
                sapato: sapato,
                blusa: blusa,
                calca: calca,
                observacoes: observacoes
            }

        
            const response = await fetch(`https://amigo-secreto-back-h9n4.onrender.com

/insertUser`, {
                method: 'POST', // Definindo o método como POST
                headers: {
                  'Content-Type': 'application/json' // Tipo do conteúdo enviado
                },
                body: JSON.stringify(data) // Convertendo os dados para JSON
            });
            alert('Registro salvo com sucesso!')
            return await response.json(); // Convertendo a resposta em JSON
        }
        else{

            data = {
                _id: id,
                nome: nome,
                sapato: sapato,
                blusa: blusa,
                calca: calca,
                observacoes: observacoes
            }
        
            const response = await fetch(`https://amigo-secreto-back-h9n4.onrender.com

/updateUser`, {
                method: 'POST', // Definindo o método como POST
                headers: {
                  'Content-Type': 'application/json' // Tipo do conteúdo enviado
                },
                body: JSON.stringify(data) // Convertendo os dados para JSON
            });
            alert('Registro editado com sucesso!')
            editMode = true
            return await response.json(); // Convertendo a resposta em JSON
            
        }

    })
}


const fetchAndLogUsers = async () => {
    const getUsers = async () => {
        const response = await fetch(`https://amigo-secreto-back-h9n4.onrender.com

/getUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json(); // Convertendo a resposta em JSON
    };

    // Obtendo e exibindo o resultado da função
    try {
        const users = await getUsers();
        
        //renderizar tabela com registros inseridos
        const table = document.getElementById("table_body")

        if(table){
            users.data.forEach(element => {
    

                //gerar html
                table.innerHTML += `
                    <tr>
                        <td>${element.nome}</td>
                        <td>${element.sapato}</td>
                        <td>${element.blusa}</td>
                        <td>${element.calca}</td>
                        <td>${element.observacoes}</td>
                        <td class="text-center opcao-editar" onclick="handleEdit('${element._id}', '${element.nome}', '${element.sapato}', '${element.blusa}', '${element.calca}', '${element.observacoes}')">
                            
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg> 
                         
                        </td>

                    </tr>
                `
            });
        }

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
};

// Chamando a função de carregar dados
fetchAndLogUsers();

//opcao editar
const handleEdit = (id_user, nome, sapato, blusa, calca, observacoes)=> {

    document.getElementById('nome').value = nome;
    document.getElementById('sapato').value = sapato;
    document.getElementById('blusa').value = blusa;
    document.getElementById('calca').value = calca;
    document.getElementById('observacoes').value = observacoes;

    editMode = true
    id = id_user
}





    
    

   





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
            e.preventDefault();

            data = {
                nome: nome,
                sapato: sapato,
                blusa: blusa,
                calca: calca,
                observacoes: observacoes
            }



        
            const response = await fetch(`http://85d5-179-0-65-109.ngrok-free.app/insertUser`, {
                method: 'POST', // Definindo o método como POST
                headers: {
                  'Content-Type': 'application/json' // Tipo do conteúdo enviado
                },
                body: JSON.stringify(data) // Convertendo os dados para JSON
            });
            alert('Registro salvo com sucesso!')
            window.location.reload()
            return await response.json(); // Convertendo a resposta em JSON
        }
        else{
            e.preventDefault()
            data = {
                _id: id,
                nome: nome,
                sapato: sapato,
                blusa: blusa,
                calca: calca,
                observacoes: observacoes
            }
        
            const response = await fetch(`http://85d5-179-0-65-109.ngrok-free.app/updateUser`, {
                method: 'POST', // Definindo o método como POST
                headers: {
                  'Content-Type': 'application/json' // Tipo do conteúdo enviado
                },
                body: JSON.stringify(data) // Convertendo os dados para JSON
            });
            alert('Registro editado com sucesso!')
            window.location.reload()
            editMode = true
            return await response.json(); // Convertendo a resposta em JSON
            
        }
        
    
    })

}


const fetchAndLogUsers = async () => {
    const getUsers = async () => {
        const response = await fetch(`http://85d5-179-0-65-109.ngrok-free.app/getUsers`, {
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
                        <td class="text-center opcao-editar" onclick="handleDelete('${element._id}')">

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
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
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.getElementById('nome').value = nome;
    document.getElementById('sapato').value = sapato;
    document.getElementById('blusa').value = blusa;
    document.getElementById('calca').value = calca;
    document.getElementById('observacoes').value = observacoes;

    editMode = true
    id = id_user
}

const handleDelete = async(id_user)=> {
    data = {
        _id: id_user
    }
    
    const response = await fetch(`http://85d5-179-0-65-109.ngrok-free.app/deleteUser`,
        // const response = await fetch(`http://localhost:3000/deleteUser`, 
        
        {
            method: 'POST', // Definindo o método como POST
            headers: {
              'Content-Type': 'application/json' // Tipo do conteúdo enviado
            },
            body: JSON.stringify(data) // Convertendo os dados para JSON
        });
                    //alert('Registro deletado com sucesso!')
    alert('Registro deletado com sucesso!')
    window.location.reload()
    return await response.json() // Convertendo a resposta em JSON
    
}





    
    

   





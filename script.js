// Função para carregar os dados do CSV
function carregarDados(arquivoCSV) {
    fetch(arquivoCSV)
        .then(response => response.text())
        .then(csv => {
            const dados = csv.split('\n').map(linha => linha.split(';')); // Assumindo separador de ponto e vírgula
            const tabela = document.querySelector('#gastos table tbody');

            dados.forEach((linha, indice) => {
                if (indice === 0) return; // Ignora a primeira linha (cabeçalho)

                const [cargo, funcionario, salario, ...outrasColunas] = linha;
                const novaLinha = tabela.insertRow();

                [cargo, funcionario, salario, ...outrasColunas].forEach(celula => {
                    const novaCelula = novaLinha.insertCell();
                    novaCelula.textContent = celula;
                });
            });
        });
}

// Função para gerar o organograma (exemplo básico)
function gerarOrganograma() {
    const dados = [
        { id: '1', nome: 'Diretor', pai: null },
        { id: '2', nome: 'Gerente de Marketing', pai: '1' },
        { id: '3', nome: 'Assistente de Marketing', pai: '2' },
        // Adicione os dados do seu organograma aqui
    ];

    const tree = d3.select('#tree'); // Usando D3.js para criar o organograma

    // Implemente a lógica para criar o organograma usando D3.js ou outra biblioteca
}

// Carrega os dados e gera o organograma ao carregar a página
window.onload = () => {
    carregarDados('dados.csv'); // Substitua pelo nome do seu arquivo CSV
    gerarOrganograma();
};
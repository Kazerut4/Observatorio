from flask import Flask, render_template
import csv

app = Flask(__name__)

@app.route('/')
def index():
    # Carrega os dados do CSV
    with open('dados.csv', 'r', encoding='utf-8') as arquivo_csv:
        leitor_csv = csv.DictReader(arquivo_csv, delimiter=';')
        dados = list(leitor_csv)

    # Calcula o total de gastos por departamento e cargo
    gastos_por_departamento_cargo = {}
    for funcionario in dados:
        departamento = funcionario['Departamento']
        cargo = funcionario['Cargo']
        salario = float(funcionario['Salário'].replace(',', '.'))  # Converte para float
        if departamento not in gastos_por_departamento_cargo:
            gastos_por_departamento_cargo[departamento] = {}
        if cargo not in gastos_por_departamento_cargo[departamento]:
            gastos_por_departamento_cargo[departamento][cargo] = 0
        gastos_por_departamento_cargo[departamento][cargo] += salario

    return render_template('index.html', dados=dados, gastos_por_departamento_cargo=gastos_por_departamento_cargo)

if __name__ == '__main__':
    app.run(debug=True)
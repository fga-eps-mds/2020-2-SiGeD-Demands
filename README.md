# API de Demandas
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL3-blue.svg)](https://opensource.org/licenses/gpl-3.0.html)
[![codecov](https://codecov.io/gh/fga-eps-mds/2020-2-SiGeD-Demands/branch/master/graph/badge.svg?token=I08UG1R8HC)](https://codecov.io/gh/fga-eps-mds/2020-2-SiGeD-Demands)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_2020-2-G4-Demands&metric=alert_status)](https://sonarcloud.io/dashboard?id=fga-eps-mds_2020-2-G4-Demands)
[![Maintainability](https://api.codeclimate.com/v1/badges/9e950d2214a735d2ba4b/maintainability)](https://codeclimate.com/github/fga-eps-mds/2020-2-SiGeD-Demands/maintainability)

Essa API faz parte da arquitetura de microsserviços do projeto [`SiGeD`](https://github.com/fga-eps-mds/2020-2-SiGeD), sua funcionalidade é possibilitar o controle dos dados das demandas. 

## Como contribuir?

Gostaria de contribuir com nosso projeto? Acesse o nosso [guia de contribuição](https://fga-eps-mds.github.io/2020-2-SiGeD/CONTRIBUTING/) onde são explicados todos os passos.
Caso reste duvidas você também pode entrar em contato conosco criando uma issue.

## Documentação

A documentação do projeto pode ser acessada pelo nosso site em https://fga-eps-mds.github.io/2020-2-SiGeD/ ou você pode acessar pela [SiGeD Documentação](https://fga-eps-mds.github.io/2020-2-SiGeD/home/)

## Testes

Todas as funções adicionadas nessa API devem ser testadas, o repositŕorio aceita até 10% do total de lihas não testadas. Para rodar os testes nesse repositŕio deve ser executado o comando:

```bash
docker-compose run api_clients bash -c  "yarn && yarn jest --coverage --forceExit"
```

## Como rodar?

Para rodar a API é preciso usar os seguintes comandos usando o docker:

Crie uma network para os containers da API, caso não exista:

```bash
docker network create siged_backend
```

Suba o container com o comando:

```bash
docker-compose up
```
A API estará rodando na [porta 3003](http://localhost:3003).

## Rotas

**GET: `/category/`**

Para receber os dados de todas as categorias listadas.

**GET: `/category/:id`**

Para receber os dados de uma categoria específica utilizando o `id`.

**GET: `/demand/`**

Para receber os dados de todas as demandas listadas.

**GET: `/demand/:id`**

Para receber os dados de uma demanda específica utilizando o `id`.

**GET: `/demand/newest-four`**

Para receber as últimas quatro demandas demandas listadas.

**GET: `/clientsNames`**

Para receber os nomes dos clientes.

**GET: `/demand/history/:id`**

Para receber o histórico de demandas.

**GET: `/statistic/category`**

Para receber os dados das estatísticas por categoria.

**GET: `/statistic/sector`**

Para receber os dados das estatísticas por setor.

**GET: `/alert`**

Para receber os dados de todos os alertas listados.

**GET: `/alert/demand/:demandID`**

Para receber os dados dos alertas pelo `id` da demanda. 

**GET: `/alert/sector/:sectorID`**

Para receber os dados dos alertas pelo `id` do setor. 

**POST: `/category/create`**

Para criar uma nova categorias, envie os dados nesse formato:

```json
{
    "name": "Nome da categoria",
    "description": "Descrição da categoria",
    "color": "#000000"
}
```

**POST: `/demand/create`**

Para criar uma nova categorias, envie os dados nesse formato:

```json
{
    "name": "Nome da demanda",
    "description": "Descrição da demanda",
    "process": "43017",
    "sectorID": "6074c01561b3ce0040c55222",
		"clientID": "6078cf89f3be730047d7d618",
		"userID": "608a32ff3b3afd003fa6b37e",
		"categoryID": ["6074bfadd1d77900489f67d5"]
}
```

**POST: `/alert/create`**

Para criar uma nova categorias, envie os dados nesse formato:

```json
{
	"name": "Nome do alerta",
	"description": "Descrição do alerta",
	"date": "2021-05-04",
	"alertClient": false,
	"checkbox": false,
	"demandID": "608a0f642571c900403f00c3",
	"sectorID": "608a0ee34314020047e2a7d6"
}
```

**PUT: `/category/update/:id`**

Para atualizar os dados de uma categoria, envie os dados atualizados seguindo o padrão:

```json
{
    "name": "Nome da categoria",
    "description": "Descrição da categoria",
    "color": "#000000"
}
```

**PUT: `/demand/update/:id`**

Para atualizar os dados de uma demanda, envie os dados atualizados seguindo o padrão:

```json
{
    "name": "Nome da demanda atualizado",
    "description": "Descrição da demanda atualizada",
    "process": "43012",
    "sectorID": "6074c01561b3ce0040c55222",
		"clientID": "6078cf89f3be730047d7d618",
		"userID": "608a32ff3b3afd003fa6b37e",
		"categoryID": ["6074bfadd1d77900489f67d5"]
}
```

**PUT: `/demand/sectorupdate/:id`**



```json

```

**PUT: `/demand/forward/:id`**



```json

```

**PUT: `/demand/toggle/:id`**


```json

```

**PUT: `/demand/create-demand-update/:id`**

Para criar uma atualização da demanda.

```json
{
	"userName": "Nome",
	"description": "Descrição da demanda",
	"visibilityRestriction": true
}
```

**PUT: `/demand/update-demand-update/:id`**

Para atualizar a atualização da demanda.

```json
{
	"userName": "Nome",
	"description": "Descrição atualizada",
	"visibilityRestriction": true
}
```

**PUT: `/demand/delete-demand-update/:id`**

Para deletar a atualização da demanda.

**PUT: `/alert/update/:id`**

Para atualizar os dados de um alerta, envie os dados atualizados seguindo o padrão:

```json
{
	"name": "Nome do alerta atualizado",
	"description": "Descrição do alerta atualizada",
	"date": "2021-05-04",
	"alertClient": false,
	"checkbox": true,
	"demandID": "608a0f642571c900403f00c3",
	"sectorID": "608a0ee34314020047e2a7d6"
}
```

**DELETE: `/category/delete/:id`**

Para deletar uma categoria pelo `id`.

**DELETE: `/alert/delete/:id`**

Para deletar um alerta pelo `id`.
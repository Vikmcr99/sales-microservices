Projeto: Curso Udemy - Comunicação entre Microsserviços

Tecnologias
Java 17
Spring Boot 
Javascript 
Node.js 
ES6 Modules
Express.js
MongoDB (Container e Cloud MongoDB)
API REST
PostgreSQL (Container)
RabbitMQ (Container e CloudAMQP)
Docker
docker-compose
JWT
Spring Cloud OpenFeign
Axios

Arquitetura Proposta
No curso, desenvolvi a seguinte aquitetura:

3 APIs:

Auth-API: API de Autenticação com Node.js, Express.js, Sequelize, PostgreSQL, JWT e Bcrypt.
Sales-API: API de Vendas com Node.js, Express.js, MongoDB, Mongoose, validação de JWT, RabbitMQ e Axios para clients HTTP.
Product-API: API de Produtos com Java 17, Spring Boot, Spring Data JPA, PostgreSQL, validação de JWT, RabbitMQ e Spring Cloud OpenFeign para clients HTTP.

Também coloquei toda a arquitetura rodando em containers docker via docker-compose.

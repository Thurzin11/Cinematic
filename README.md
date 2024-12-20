# 🎥 Cinematic

Este repositório contém o projeto **Cinematic**, uma aplicação para **gerenciamento de ingressos de cinema**. O objetivo é facilitar o controle de vendas de ingressos, exibindo informações de filmes, horários, assentos e gerando ingressos em PDF com QR Code.  

## 🚀 Funcionalidades

- **Login e Autenticação**: Controle de acesso seguro para os usuários.  
- **Cadastro de Filmes e Sessões**: Adição de filmes, horários de exibição e salas.  
- **Seleção de Assentos**: Escolha de assentos disponíveis para cada sessão.  
- **Gerenciamento de Pedidos**: Controle de pedidos, incluindo status e histórico de compras.  
- **Geração de Ingressos PDF**: Geração de ingressos em formato PDF com QR Code, valor, data do filme e hora da sessão.  

## 💠 Tecnologias Utilizadas

- **Back-End**:  
  - **Java**: Linguagem de programação principal.  
  - **Spring Boot**: Framework para criação do servidor e APIs REST.  
  - **PostgreSQL**: Banco de dados relacional para persistência dos dados.  

- **Front-End**:  
  - **Angular**: Framework para construção da interface web.  

- **Outras Tecnologias**:  
  - **TypeScript**: Linguagem usada no Angular.  
  - **HTML/CSS**: Para estilização e estrutura das páginas.  
  - **Biblioteca de Geração de PDFs**: Para criação de ingressos com layout personalizado.  

## 📂 Estrutura do Repositório

```
Cinematic/
├── src/
│   ├── main/
│   │   ├── java/           # Código fonte do back-end (Spring Boot)
│   │   ├── resources/      # Arquivos de configuração do Spring Boot
│   │   └── ...             # Outros arquivos de configuração e scripts
│   └── front-end/          # Código fonte do front-end (Angular)
│
├── .gitignore             # Arquivos a serem ignorados pelo Git
├── README.md              # Documentação do projeto
└── pom.xml                # Arquivo de configuração do Maven
```

## 📦 Como Executar o Projeto

### ⚙️ Requisitos

- **JDK 17** ou superior  
- **Node.js** (para rodar o Angular)  
- **PostgreSQL** (para o banco de dados)  

### ▶️ Passos para Execução

1. **Clone o repositório**:  
   ```bash
   git clone https://github.com/Thurzin11/Cinematic.git
   ```

2. **Back-End (Spring Boot)**:  
   - Navegue até a pasta do back-end:  
     ```bash
     cd Cinematic/src/main/java
     ```
   - Configure o arquivo **application.properties** para incluir as credenciais do seu banco de dados PostgreSQL.  
   - Execute o servidor Spring Boot:  
     ```bash
     mvn spring-boot:run
     ```

3. **Front-End (Angular)**:  
   - Navegue até a pasta do front-end:  
     ```bash
     cd Cinematic/src/front-end
     ```
   - Instale as dependências:  
     ```bash
     npm install
     ```
   - Execute o servidor Angular:  
     ```bash
     ng serve
     ```

4. **Acesse a aplicação**:  
   - **Front-End**: Acesse [http://localhost:4200](http://localhost:4200) no navegador.  
   - **Back-End**: O servidor Spring Boot estará disponível em [http://localhost:8080](http://localhost:8080).  

## 🔥 Exemplos de Uso

- **Login**: Usuário acessa a aplicação e realiza o login.  
- **Seleção de Sessão**: Escolha de filme, data e horário.  
- **Seleção de Assentos**: Escolha dos assentos disponíveis.  
- **Geração de Ingresso**: Ingresso gerado em PDF com QR Code para validação.  

## 📋 Contribuição

Contribuições são bem-vindas! Se você quiser contribuir:  
1. Faça um **fork** do repositório.  
2. Crie uma **branch** para a sua funcionalidade (`git checkout -b feature/nova-funcionalidade`).  
3. Faça o **commit** das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).  
4. Faça o **push** para a branch (`git push origin feature/nova-funcionalidade`).  
5. Abra um **Pull Request**.  

## 📜 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.  

---

Desenvolvido com 💻 e ☕ por **Arthur Santos Gonçalves**, **Mateus Reisdorfer** e**Ruan Pablo Lana**.  
Se tiver dúvidas, sugestões ou melhorias, sinta-se à vontade para abrir uma **issue** ou entrar em contato.  


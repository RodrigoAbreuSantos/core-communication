# 📚 Estudo e Justificativa de Padrões de Projeto (RESUMO.md)

Este documento contém o estudo teórico dos padrões de projeto utilizados e a justificativa detalhada de sua aplicação no projeto "API de Notificações", conforme solicitado pela Atividade - Parte 2.

---

## 1. Estudo Teórico dos Padrões 

### 1.1. Singleton (Criacional)

* **Propósito:** O Singleton é um padrão de projeto criacional que garante que uma classe tenha **apenas uma instância** e fornece um ponto de acesso global para essa instância.
* **Estrutura:**
    * A classe Singleton declara um método de criação estático (como `getInstance()`) que retorna sua própria instância única.
    * O **construtor da classe é tornado privado**. Isso impede que qualquer outro objeto, exceto a própria classe Singleton, use o operador `new` para criar novas instâncias.
    * Internamente, a classe armazena a instância única em um campo estático privado. Na primeira vez que `getInstance()` é chamado, ele cria o objeto e o armazena. Em todas as chamadas subsequentes, ele apenas retorna o objeto já existente.
* **Quando Usar e Trade-offs:**
    * **Use** quando um recurso (como um banco de dados, log ou serviço de configuração) precisar ser compartilhado por várias partes do programa, e você precisar garantir que há apenas uma instância desse recurso.
    * **Pró:** Você tem certeza de que uma classe só terá uma única instância e ganha um ponto de acesso global para ela.
    * **Contra (Trade-off):** O padrão pode violar o Princípio da Responsabilidade Única (a classe passa a ser responsável por sua própria criação e ciclo de vida). Além disso, ele pode mascarar um design ruim (quando componentes sabem demais uns sobre os outros) e se comportar de forma parecida com variáveis globais, o que pode dificultar os testes de unidade.

### 1.2. Adapter (Estrutural)

* **Propósito:** O Adapter (ou *Wrapper*) é um padrão de projeto estrutural que permite que objetos com **interfaces incompatíveis colaborem** entre si.
* **Estrutura:**
    * O padrão envolve um objeto especial, o **Adapter**, que atua como um "tradutor" ou "ponte" entre duas interfaces.
    * O **Cliente** (Client) é a classe que precisa usar o serviço. Ele só entende a interface **Alvo** (Target).
    * O **Serviço** (Adaptee) é a classe externa ou legada que o Cliente quer usar, mas que possui uma interface incompatível.
    * O `Adapter` implementa a interface Alvo. Por "baixo dos panos", ele "envolve" (geralmente via composição) uma instância do Serviço. Quando o Cliente chama um método na interface Alvo do Adapter, o Adapter traduz essa chamada para o método correspondente na interface incompatível do Serviço.
* **Quando Usar e Trade-offs:**
    * **Use** quando precisar que uma classe existente (com interface incompatível) funcione com o resto do seu código. É muito comum para integrar bibliotecas de terceiros, APIs externas ou sistemas legados.
    * **Pró:** Você desacopla o Cliente da implementação concreta do Serviço. Você pode introduzir novos Adapters para diferentes serviços sem alterar o Cliente (Princípio Aberto/Fechado).
    * **Contra (Trade-off):** A complexidade do código aumenta, pois você precisa introduzir um novo conjunto de classes e interfaces. Às vezes, pode ser mais simples apenas mudar o Serviço (se você puder).

### 1.3. Factory Method (Criacional)

* **Propósito:** O Factory Method é um padrão de projeto criacional que fornece uma **interface para criar objetos** em uma superclasse, mas permite que as **subclasses alterem o tipo de objetos** que serão criados.
* **Estrutura:**
    * O padrão define uma classe **Criadora** (Creator) que declara o "método fábrica" (`factoryMethod()`), cujo tipo de retorno é uma interface de **Produto** (Product).
    * Classes **Criadoras Concretas** (Concrete Creators) herdam da Criadora e sobrescrevem o `factoryMethod()` para retornar um tipo específico de **Produto Concreto** (Concrete Product).
    * O Cliente usa a classe Criadora, mas não sabe qual Produto Concreto está sendo criado. Ele apenas sabe que receberá um objeto que segue a interface Produto.
* **Quando Usar e Trade-offs:**
    * **Use** quando você não sabe de antemão os tipos exatos de objetos que seu código precisará criar (ex: com base em configuração, ambiente ou entrada do usuário). Use também quando quiser dar às subclasses a responsabilidade de criar objetos específicos.
    * **Pró:** Você evita acoplamento forte entre o Criador e os Produtos concretos. O código se torna mais flexível e extensível, pois novos produtos podem ser adicionados sem alterar o código Criador existente (Princípio Aberto/Fechado).
    * **Contra (Trade-off):** O código se torna mais complexo, pois você precisa introduzir muitas novas subclasses (um Criador Concreto para cada Produto Concreto).

### 1.4. Observer (Comportamental)

* **Propósito:** O Observer é um padrão de projeto comportamental que define um mecanismo de **assinatura** (subscription) para notificar múltiplos objetos sobre quaisquer **eventos** que aconteçam com o objeto que eles estão observando.
* **Estrutura:**
    * O padrão possui dois participantes principais: o **Publicador** (Publisher, também chamado de Subject) e o **Assinante** (Subscriber, também chamado de Observer).
    * O **Publicador** mantém uma lista de Assinantes e expõe métodos para adicionar (`subscribe()`) e remover (`unsubscribe()`) assinantes dessa lista.
    * Quando algo importante acontece no Publicador (ex: seu estado muda), ele percorre sua lista de Assinantes e chama um método de notificação específico (como `update()`) em cada um deles.
    * Os **Assinantes** implementam uma interface comum que o Publicador usa para notificá-los.
* **Quando Usar e Trade-offs:**
    * **Use** quando mudanças no estado de um objeto podem exigir que outros objetos sejam alterados, mas você não quer que esses objetos sejam fortemente acoplados. É a base de sistemas orientados a eventos.
    * **Pró:** Você pode estabelecer relações entre objetos em tempo de execução. O padrão promove baixo acoplamento: o Publicador não precisa saber quem são os Assinantes concretos, apenas que eles implementam a interface de Assinante (Princípio Aberto/Fechado).
    * **Contra (Trade-off):** As notificações podem ocorrer em ordem aleatória. Se um assinante falhar, pode impedir que outros sejam notificados (se não for bem implementado). Em alguns casos, pode ser difícil depurar um fluxo de "eventos em cascata".

---

## 2. Justificativas Detalhadas da Aplicação 

Esta seção detalha a aplicação de cada padrão no contexto da API de Notificações.

### 2.1. Padrão: Singleton (Criacional)

* **Por que o padrão foi escolhido?** 
    * Foi escolhido (e utilizado nativamente pelo Nest.js) para gerenciar o `ConfigService`. Este serviço precisa ser uma "fonte única da verdade" para configurações críticas, como chaves de API (SendGrid, Twilio), que são carregadas uma única vez.
* **Qual problema ele resolve?** 
    * Resolve o problema de ter múltiplas instâncias de configuração, o que consumiria memória desnecessariamente e poderia levar a inconsistências (ex: um serviço lendo uma chave desatualizada).
* **Quais benefícios ele traz?** 
    * **Manutenibilidade:** A configuração está centralizada em um único objeto.
    * **Performance:** Evita I/O repetido (leitura de `.env`) e garante que as chaves sejam carregadas na memória apenas uma vez.
* **Como o código seria diferente/pior sem ele?** 
    * Sem o padrão, cada serviço (`SendGridAdapter`, `TwilioAdapter`) teria que instanciar seu próprio `ConfigService` ou, pior, ler o arquivo `.env` diretamente. Isso duplicaria código, dificultaria a troca de chaves e tornaria os testes muito mais difíceis.

### 2.2. Padrão: Adapter (Estrutural)

* **Por que o padrão foi escolhido?** 
    * Foi escolhido para isolar o núcleo da nossa aplicação (o `NotificationService`) das implementações de APIs externas (SendGrid, Twilio), cujos SDKs e contratos não controlamos.
* **Qual problema ele resolve?** 
    * Resolve a incompatibilidade de interfaces. Nossa aplicação quer chamar um método simples (`send()`), mas cada provedor tem seu próprio método complexo (ex: `sendgrid.mail.send()`). O Adapter "traduz" essa chamada.
* **Quais benefícios ele traz?** 
    * **Flexibilidade:** Podemos trocar o SendGrid pelo Mailgun ou Amazon SES apenas criando um novo `Adapter` (`MailgunAdapter`), sem mudar *nenhuma linha* do `NotificationService`.
    * **Testabilidade:** Podemos criar um `FakeEmailAdapter` (como o `LogEmailAdapter`) para rodar testes sem disparar e-mails reais.
* **Como o código seria diferente/pior sem ele?**
    * O `NotificationService` estaria *fortemente acoplado* ao SDK do SendGrid. Ele teria `import { SendGridService } from '@sendgrid/mail'` no topo. Se o SendGrid mudasse sua API ou se quiséssemos trocar de provedor, teríamos que reescrever o serviço inteiro.

### 2.3. Padrão: Factory Method (Criacional)

* **Por que o padrão foi escolhido?** 
    * Foi escolhido para desacoplar o `NotificationService` da *decisão* de qual `IEmailProvider` (Adapter) instanciar. O serviço só precisa de *um* provedor, ele não deve se importar *qual* é.
* **Qual problema ele resolve?** 
    * Resolve a lógica de criação de objetos complexos com base em configuração externa (o `ConfigService`). Ele permite que o `NotificationModule` decida qual `Adapter` será criado em tempo de execução.
* **Quais benefícios ele traz?** 
    * **Escalabilidade:** Permite adicionar novos provedores facilmente.
    * **Flexibilidade:** Permite que o ambiente (desenvolvimento vs. produção) determine qual `Adapter` usar (ex: `LogEmailAdapter` em dev, `SendGridAdapter` em prod) alterando apenas o `.env`.
* **Como o código seria diferente/pior sem ele?**
    * O `NotificationService` teria um `if/else` ou `switch` em seu construtor: `if (config.provider == 'sendgrid') { this.provider = new SendGridAdapter() } else { this.provider = new LogEmailAdapter() }`. Isso violaria o Princípio da Responsabilidade Única (SRP).

### 2.4. Padrão: Observer (Comportamental)

* **Por que o padrão foi escolhido?** 
    * Foi escolhido para permitir a comunicação entre módulos (`Auth` e `Notification`) de forma totalmente desacoplada. Um módulo de autenticação não deve ter conhecimento sobre um módulo de notificação.
* **Qual problema ele resolve?** 
    * Resolve o problema de notificar múltiplos serviços sobre um evento (ex: `user.created`) sem que o emissor do evento (o "Subject", `AppController`/`AuthService`) precise conhecer quem são os "Observers" (`UserCreatedListener`).
* **Quais benefícios ele traz?** 
    * **Desacoplamento:** O `AuthService` (simulado pelo `AppController`) apenas emite um evento e seu trabalho termina. Ele não sabe (e não se importa) se 1 ou 10 serviços estão ouvindo.
    * **Escalabilidade:** Podemos facilmente adicionar novos *Listeners* para o mesmo evento (ex: `AnalyticsListener`, `CRMSyncListener`) sem *nunca* tocar no `AuthService`.
* **Como o código seria diferente/pior sem ele?**
    * O `AuthService` teria que **injetar** o `NotificationService` (e o `AnalyticsService`, e o `CRMService`...). Isso criaria um acoplamento forte, violaria o SRP (o `AuthService` teria que se preocupar em enviar e-mails) e poderia até criar dependências circulares.
---

## 2. Justificativas Detalhadas da Aplicação 

Esta seção detalha a aplicação de cada padrão no contexto da API de Notificações.

### 2.1. Padrão: Singleton (Criacional)

* **Por que o padrão foi escolhido?** 
    * Foi escolhido (e utilizado nativamente pelo Nest.js) para gerenciar o `ConfigService`. Este serviço precisa ser uma "fonte única da verdade" para configurações críticas, como chaves de API (SendGrid, Twilio), que são carregadas uma única vez.
* **Qual problema ele resolve?** 
    * Resolve o problema de ter múltiplas instâncias de configuração, o que consumiria memória desnecessariamente e poderia levar a inconsistências (ex: um serviço lendo uma chave desatualizada).
* **Quais benefícios ele traz?** 
    * **Manutenibilidade:** A configuração está centralizada em um único objeto.
    * **Performance:** Evita I/O repetido (leitura de `.env`) e garante que as chaves sejam carregadas na memória apenas uma vez.
* **Como o código seria diferente/pior sem ele?** 
    * Sem o padrão, cada serviço (`SendGridAdapter`, `TwilioAdapter`) teria que instanciar seu próprio `ConfigService` ou, pior, ler o arquivo `.env` diretamente. Isso duplicaria código, dificultaria a troca de chaves e tornaria os testes muito mais difíceis.

### 2.2. Padrão: Adapter (Estrutural)

* **Por que o padrão foi escolhido?** 
    * Foi escolhido para isolar o núcleo da nossa aplicação (o `NotificationService`) das implementações de APIs externas (SendGrid, Twilio), cujos SDKs e contratos não controlamos.
* **Qual problema ele resolve?** 
    * Resolve a incompatibilidade de interfaces. Nossa aplicação quer chamar um método simples (`send()`), mas cada provedor tem seu próprio método complexo (ex: `sendgrid.mail.send()`). O Adapter "traduz" essa chamada.
* **Quais benefícios ele traz?** 
    * **Flexibilidade:** Podemos trocar o SendGrid pelo Mailgun ou Amazon SES apenas criando um novo `Adapter` (`MailgunAdapter`), sem mudar *nenhuma linha* do `NotificationService`.
    * **Testabilidade:** Podemos criar um `FakeEmailAdapter` (como o `LogEmailAdapter`) para rodar testes sem disparar e-mails reais.
* **Como o código seria diferente/pior sem ele?** 
    * O `NotificationService` estaria *fortemente acoplado* ao SDK do SendGrid. Ele teria `import { SendGridService } from '@sendgrid/mail'` no topo. Se o SendGrid mudasse sua API ou se quiséssemos trocar de provedor, teríamos que reescrever o serviço inteiro.

### 2.3. Padrão: Factory Method (Criacional)

* **Por que o padrão foi escolhido?** 
    * Foi escolhido para desacoplar o `NotificationService` da *decisão* de qual `IEmailProvider` (Adapter) instanciar. O serviço só precisa de *um* provedor, ele não deve se importar *qual* é.
* **Qual problema ele resolve?** 
    * Resolve a lógica de criação de objetos complexos com base em configuração externa (o `ConfigService`). Ele permite que o `NotificationModule` decida qual `Adapter` será criado em tempo de execução.
* **Quais benefícios ele traz?** 
    * **Escalabilidade:** Permite adicionar novos provedores facilmente.
    * **Flexibilidade:** Permite que o ambiente (desenvolvimento vs. produção) determine qual `Adapter` usar (ex: `LogEmailAdapter` em dev, `SendGridAdapter` em prod) alterando apenas o `.env`.
* **Como o código seria diferente/pior sem ele?** 
    * O `NotificationService` teria um `if/else` ou `switch` em seu construtor: `if (config.provider == 'sendgrid') { this.provider = new SendGridAdapter() } else { this.provider = new LogEmailAdapter() }`. Isso violaria o Princípio da Responsabilidade Única (SRP).

### 2.4. Padrão: Observer (Comportamental)

* **Por que o padrão foi escolhido?** 
    * Foi escolhido para permitir a comunicação entre módulos (`Auth` e `Notification`) de forma totalmente desacoplada. Um módulo de autenticação não deve ter conhecimento sobre um módulo de notificação.
* **Qual problema ele resolve?** 
    * Resolve o problema de notificar múltiplos serviços sobre um evento (ex: `user.created`) sem que o emissor do evento (o "Subject", `AppController`/`AuthService`) precise conhecer quem são os "Observer
    * **Desacoplamento:** O `AuthService` (simulado pelo `AppController`) apenas emite um evento e seu trabalho termina. Ele não sabe (e não se importa) se 1 ou 10 serviços estão ouvindo.
    * **Escalabilidade:** Podemos facilmente adicionar novos *Listeners* para o mesmo evento (ex: `AnalyticsListener`, `CRMSyncListener`) sem *nunca* tocar no `AuthService`.
* **Como o código seria diferente/pior sem ele?** 
    * O `AuthService` teria que **injetar** o `NotificationService` (e o `AnalyticsService`, e o `CRMService`...). Isso criaria um acoplamento forte, violaria o SRP (o `AuthService` teria que se preocupar em enviar e-mails) e poderia até criar dependências circulares.
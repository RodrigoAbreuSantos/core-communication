# 🚀 API de Notificações (Atividade Padrões de Projeto - Parte 2)

Esta é uma API desenvolvida em Nest.js como parte da atividade "Estudo e Aplicação de Padrões de Projeto". O objetivo do projeto é demonstrar a aplicação prática de 4 padrões de projeto (Singleton, Adapter, Factory Method e Observer) em um contexto de microsserviço de notificações multicanal (Email e SMS).

---

## 🛠️ Tecnologias Utilizadas

* **Nest.js** (Framework Node.js)
* **TypeScript**
* **@nestjs/event-emitter** (Implementação do Padrão Observer)

---

## ⚙️ Instruções de Execução

1.  **Clone o repositório:**
    ```bash
    # git clone <url-do-seu-repo>
    # cd <pasta-do-projeto>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    *Obs: Não se esqueça de rodar `npm install @nestjs/event-emitter` se ainda não o fez.*

3.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run start:dev
    ```

A API estará rodando em `http://localhost:3000`.

---

## 🧪 Como Testar e Ver os Padrões em Ação

### Teste 1: Padrões Observer e Factory Method

1.  Abra seu navegador e acesse a URL:
    `http://localhost:3000/test-event`
2.  **O que acontece:**
    * O `AppController` (Subject) emite um evento `user.created` **(Padrão Observer)**.
    * O `UserCreatedListener` (Observer) escuta este evento e chama o `NotificationService`.
    * O `NotificationService` usa o provedor de e-mail que foi injetado.
    * A `emailProviderFactory` **(Padrão Factory Method)** decidiu qual provedor injetar (`SendGridAdapter` ou `LogEmailAdapter`) com base no `ConfigService`.
3.  **Para testar a Factory:**
    * Vá em `src/config/config.service.ts`.
    * Mude a linha `EMAIL_PROVIDER: 'sendgrid'` para `EMAIL_PROVIDER: 'log'`.
    * Salve o arquivo (o servidor reiniciará) e acesse o link novamente. Você verá no console que o `LogEmailAdapter` foi usado.

### Teste 2: Padrão Adapter

1.  Use o Postman, Insomnia ou `curl` para fazer um `POST` para a URL:
    `http://localhost:3000/notification/send-sms`
2.  **Envie o seguinte JSON no body:**
    ```json
    {
      "phone": "+5511999998888",
      "message": "Teste do Padrão Adapter"
    }
    ```
3.  **O que acontece:**
    * O `NotificationController` chama o `NotificationService`.
    * O `NotificationService` chama o método `send()` no `smsProvider` injetado.
    * O `TwilioAdapter` **(Padrão Adapter)**, que implementa a interface `ISmsProvider`, é executado e "traduz" a chamada genérica para uma chamada (simulada) específica da API do Twilio.

---

## 🗺️ Onde Encontrar os Padrões no Código 

* **1. Singleton (Criacional):**
    * **Local:** `src/config/config.service.ts`
    * **Explicação:** O próprio Nest.js aplica este padrão. Ao registrar o `ConfigService` como um *provider* (especialmente um global), o framework garante que uma única instância (um Singleton) seja compartilhada por toda a aplicação.

* **2. Adapter (Estrutural):**
    * **Local:** `src/notification/adapters/` (ex: `sendgrid.adapter.ts`, `twilio.adapter.ts`)
    * **Explicação:** As classes `SendGridAdapter` e `LogEmailAdapter` "adaptam" a nossa interface interna (`IEmailProvider`) para as APIs externas. O `TwilioAdapter` faz o mesmo para a interface `ISmsProvider`.

* **3. Factory Method (Criacional):**
    * **Local:** `src/notification/notification.module.ts` (na variável `emailProviderFactory`)
    * **Explicação:** Usamos uma *Custom Provider Factory* do Nest.js. O objeto `emailProviderFactory` define um método (`useFactory`) que decide dinamicamente qual *classe concreta* (qual *Adapter*) será instanciada e injetada sob o token `EMAIL_PROVIDER_TOKEN`.

* **4. Observer (Comportamental):**
    * **Local (Observer):** `src/notification/listeners/user-created.listener.ts`
    * **Local (Subject/Emissor):** `src/app.controller.ts`
    * **Explicação:** O `UserCreatedListener` usa o decorador `@OnEvent('user.created')` para "escutar" o evento. O `AppController` usa o `EventEmitter2` para "emitir" o evento, desacoplando totalmente os dois módulos.
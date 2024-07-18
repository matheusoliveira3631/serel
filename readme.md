**Sobre as alterações para cada "fundo"**

- Pasta `assets`:
  - Imagens
  - Ícones
- Pasta `src/theme`:
  - Paleta de cores
- Arquivo `app.json`:
  - Alterar:
    - **nome**
    - **slug**
    - **ios.bundleIdentifier**
    - **android.package**
    - **extra.eas.projectId**
    - **updates.url**
- Arquivo `src/services/api.ts`:
  - **apiURL**
- Arquivo `eas.json`:
  - **submit.production.ios.appName**

**Arquitetura**

- Criar uma branch para cada "fundo" que terá como branch principal a main (com a identidade da serel).
- A cada alteração no app base (branch main) deverá entrar nas outras branchs realizando o merge com a main.
- Cada branch do "fundo" terá sua própria identidade.

**Fluxo de merge**

- ALTERAÇÕES → PRINCIPAL (BASE) → SECUNDÁRIA (main-"fundo")

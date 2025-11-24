# SintoniaFit - Transformação Corporal Inteligente com IA

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/import?project-name=sintonia-fit&repository-url=https://github.com/Danieltradergo/sintonia-fit)

## 🎯 Visão Geral

**SintoniaFit** é um webapp ultra-moderno e acessível projetado para pessoas em tratamento com Moujaro, otimizando emagrecimento saudável através de:

✅ Planos de exercícios caseiros semanais personalizados com vídeos instrutivos  
✅ Cardápios customizados baseados em ingredientes do usuário  
✅ Dashboard de monitoramento com gráficos de progresso  
✅ Suporte 24/7 com Perplexity Agents especializados  
✅ Design pastel (rosa, cinza, branco) - UI ultra-clean e acessível  
✅ 100% gratuito e escalável no Vercel

---

## 🚀 Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| **Frontend** | Next.js 14 + React 18 + TypeScript + Tailwind CSS |
| **Autenticação** | Supabase Auth (Google + Email) |
| **Banco de Dados** | PostgreSQL (Supabase) |
| **IA/Agentes** | Perplexity API (Nutrição + Exercício + Suporte) |
| **Deploy** | Vercel (Gratuito com Auto-Deploy) |
| **Monitoramento** | Recharts (Gráficos de Progresso) |

---

## 📋 Funcionalidades Implementadas

### 1. **Autenticação & Onboarding**
- Login via Google OAuth ou Email/Senha
- Supabase Auth integrado
- Segurança LGPD completa

### 2. **Planos de Exercício**
- Treinos semanais progressivos
- Descrição detalhada + vídeos YouTube embutidos
- Adaptação para obesidade e realidades domésticas
- API Perplexity para geração personalizada

### 3. **Planos Alimentares**
- Cardápio semanal customizável
- Receitas com tabelas nutricionais
- Modo de preparo com tempos
- Integração com Perplexity para substituições inteligentes

### 4. **Dashboard de Progresso**
- Registro semanal de peso
- Gráficos de evolução com Recharts
- Comparativos históricos
- Notificações de metas atingidas

### 5. **Design & Branding**
- UI pastel (rosa claro #f472b6, cinza #6b7280, branco)
- Mobile-first (responsivo)
- Logo vetorial SVG exclusivo (antes/depois)
- UX otimizada para pouca familiaridade digital

---

## 🔧 Instalação Local

### Pré-requisitos
```bash
Node.js 18+ 
npm ou yarn
Conta Vercel (grátis)
Conta Supabase (grátis)
Chave API Perplexity
```

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/Danieltradergo/sintonia-fit.git
cd sintonia-fit
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Preencha:
```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service
PERPLEXITY_API_KEY=sua-chave-perplexity
```

4. **Execute em desenvolvimento**
```bash
npm run dev
```

Acesse http://localhost:3000

---

## 📦 Deploy no Vercel

### Opção 1: Deploy automático
1. Conecte seu GitHub ao Vercel
2. Selecione este repositório
3. Configure as variáveis de ambiente no Vercel Dashboard
4. Deploy automático a cada push!

### Opção 2: Usando Vercel CLI
```bash
npm install -g vercel
vercel
# Siga os prompts interativos
```

**Live URL:** https://sintonia-fit.vercel.app

---

## 🏗️ Estrutura de Projeto

```
sintonia-fit/
├── app/
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx            # Home page
│   ├── globals.css         # Estilos Tailwind globais
│   ├── providers.tsx       # Supabase & Auth providers
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── exercise-plans/
│   │   └── meal-plans/
│   └── api/
│       ├── exercise/       # Endpoint Perplexity Exercise
│       ├── meal/          # Endpoint Perplexity Meal
│       └── auth/          # Endpoints auth
├── server/                 # Express.js (opcional para lógica backend)
├── public/
│   ├── logo.svg           # Logo SintoniaFit
│   └── icons/
├── .env.example            # Template de variáveis
├── package.json            # Dependências
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind customization
└── README.md              # Este arquivo
```

---

## 🤖 Integração Perplexity Agents

### Subagentes Especializados

#### 1. **Agente Nutrição** 🍽️
- Prompt: Gera cardápios com Moujaro
- Input: Ingredientes + Restrições
- Output: Receita completa + Macros

#### 2. **Agente Personal** 🏋️
- Prompt: Treinos progressivos em casa
- Input: Peso + Espaço + Limitações
- Output: Plano semanal + Videos

#### 3. **Agente Apoio** 💬
- Prompt: Motivação + Dúvidas técnicas
- Input: Pergunta do usuário
- Output: Resposta personalizada 24/7

### Exemplo de Chamada API
```typescript
import { supabase } from '@/app/providers';

const generateMealPlan = async (ingredients: string[]) => {
  const response = await fetch('/api/meal', {
    method: 'POST',
    body: JSON.stringify({ ingredients }),
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json();
};
```

---

## 🎨 Design & Paleta de Cores

```css
/* Pastel Pink Theme */
--primary-pink: #f472b6;      /* Rosa primária */
--light-pink: #fbcfe8;        /* Rosa clara */
--pastel-pink: #fce7f3;       /* Rosa pastel */
--gray: #6b7280;              /* Cinza neutro */
--gray-light: #f9fafb;        /* Cinza muito claro */
```

### Logo SVG
O logo é um vetor minimalista com contorno side-by-side:
- **Esquerda:** Mulher com silhueta rounder (antes)
- **Direita:** Mulher com silhueta esbelta (depois)
- **Cores:** Gradiente rosa (before → after)

---

## 📊 Monitoramento & Logs

- **Vercel Analytics** para performance
- **Supabase Logs** para debug
- **Edge Functions** para execução rápida
- **Recharts** para visualização de progresso

---

## 🔐 Segurança & Privacidade

✅ LGPD Compliance  
✅ Criptografia end-to-end (Supabase)
✅ OAuth com Google (permissões mínimas)
✅ Sem armazenamento de senhas (delegado Supabase)
✅ Data retention policy (exclusão automática)

---

## 🐛 Troubleshooting

### Erro: "Supabase connection failed"
- Verifique `NEXT_PUBLIC_SUPABASE_URL` e chaves em `.env.local`
- Teste conexão: `curl https://seu-url.supabase.co`

### Erro: "Perplexity API rate limited"
- Aguarde 60 segundos
- Verifique plano de subscrição no Perplexity Dashboard

### Erro 404 no Vercel
- Confirme que `app/page.tsx` existe
- Execute: `npm run build` localmente

---

## 📝 Roadmap Futuro

- [ ] App mobile nativa (React Native)
- [ ] Integração com Wearables (Apple Watch, Fitbit)
- [ ] Análise de sangue & integração com labs
- [ ] Comunidade & social sharing
- [ ] Suporte a múltiplos idiomas
- [ ] Relatórios PDF exportáveis

---

## 📄 Licença

MIT License - Veja [LICENSE](LICENSE) para detalhes

---

## 👨‍💻 Autor

**Daniel Tradergo** - [@Danieltradergo](https://github.com/Danieltradergo)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/amazing-feature`)
3. Commit suas mudanças (`git commit -m 'Add amazing feature'`)
4. Push para a branch (`git push origin feature/amazing-feature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas e suporte:
- 📧 Email: [seu-email@example.com]
- 🐛 Issues: [GitHub Issues](https://github.com/Danieltradergo/sintonia-fit/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/Danieltradergo/sintonia-fit/discussions)

---

**Desenvolvido com ❤️ para transformação de vidas**

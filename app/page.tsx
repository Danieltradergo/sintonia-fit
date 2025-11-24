'use client';

import { useEffect, useState } from 'react';
import { supabase } from './providers';
import Link from 'next/link';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-pink-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-pink-100 py-4 px-4 md:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-300 rounded-lg"></div>
            <h1 className="text-xl font-bold text-gray-900">SintoniaFit</h1>
          </div>
          <div className="flex gap-4">
            {!user ? (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-gray-700 hover:text-pink-600 font-medium">
                  Login
                </Link>
                <Link href="/auth/signup" className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 font-medium">
                  Cadastro
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 font-medium">
                  Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Transforme seu Corpo com IA
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Planos de exercícios caseiros e receitas customizadas, personalizados com inteligência artificial para quem usa Moujaro.
        </p>
        {!user ? (
          <Link href="/auth/signup" className="inline-block px-8 py-4 bg-pink-400 text-white rounded-lg hover:bg-pink-500 text-lg font-semibold transition">
            Começar Agora
          </Link>
        ) : (
          <Link href="/dashboard" className="inline-block px-8 py-4 bg-pink-400 text-white rounded-lg hover:bg-pink-500 text-lg font-semibold transition">
            Acessar Dashboard
          </Link>
        )}
      </section>

      {/* Features */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8">
          {[
            { title: '🏠 Exercícios em Casa', desc: 'Treinos progressivos adaptados ao seu espaço e nível' },
            { title: '🍽️ Receitas Personalizadas', desc: 'Cardapio customizado com ingredientes que você tem' },
            { title: '📊 Monitoramento Semanal', desc: 'Gráficos de progresso e tendências de emagrecimento' },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 border border-pink-100 rounded-lg bg-pink-50 hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

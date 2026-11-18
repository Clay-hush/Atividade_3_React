import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, Check, ChevronRight, CircleHelp, Leaf, Minus, Plus, ShoppingBag, ShoppingBasket, Sparkles, Trash2, X } from 'lucide-react'

const products = [
  { id: 1, name: 'Tomate italiano', detail: 'Orgânico · 500 g', price: 8.9, emoji: '🍅', color: 'bg-[#f9e4dc]', tag: 'Da estação' },
  { id: 2, name: 'Abacate manteiga', detail: 'Macio e cremoso · un.', price: 12.5, emoji: '🥑', color: 'bg-[#e8edda]', tag: 'Favorito' },
  { id: 3, name: 'Cenoura baby', detail: 'Colhida hoje · 300 g', price: 6.9, emoji: '🥕', color: 'bg-[#f8ead5]', tag: '' },
  { id: 4, name: 'Morango fresco', detail: 'Doce e local · 250 g', price: 14.9, emoji: '🍓', color: 'bg-[#f4dfe1]', tag: 'Do produtor' },
]

const money = (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

function App() {
  const [cart, setCart] = useState([])
  const [justAdded, setJustAdded] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [orderDone, setOrderDone] = useState(false)
  const [count, setCount] = useState(0)

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart])
  const nameInvalid = submitted && !name.trim()
  const emailInvalid = submitted && !/^\S+@\S+\.\S+$/.test(email)

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, quantity: 1 }]
    })
    setJustAdded(product.id)
    window.setTimeout(() => setJustAdded((current) => current === product.id ? null : current), 1400)
  }

  function changeQuantity(productId, amount) {
    setCart((current) => current
      .map((item) => item.id === productId ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0))
  }

  function removeItem(productId) {
    setCart((current) => current.filter((item) => item.id !== productId))
  }

  function handleCheckout(event) {
    event.preventDefault()
    setSubmitted(true)
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email) || cart.length === 0) return
    setOrderDone(true)
    setSubmitted(false)
    setName('')
    setEmail('')
    setCart([])
  }

  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#202d20]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a href="#inicio" className="flex items-center gap-2.5" aria-label="Viva Feira, início">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#244d31] text-[#f7f7f2]"><Leaf size={21} strokeWidth={2.2} /></span>
          <span className="text-[19px] font-extrabold tracking-[-0.07em]">viva feira<span className="text-[#e38a5b]">.</span></span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[#657063] md:flex">
          <a className="transition hover:text-[#244d31]" href="#produtos">Produtos</a>
          <a className="transition hover:text-[#244d31]" href="#como-funciona">Nossa feira</a>
        </nav>
        <a href="#sacola" className="flex items-center gap-2 rounded-full border border-[#dfe3d8] bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-[#244d31]">
          <ShoppingBag size={17} /> <span>Sacola</span><span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#e7eddf] px-1 text-[11px]">{itemCount}</span>
        </a>
      </header>

      <main id="inicio">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 md:grid-cols-[1.05fr_.95fr] md:pb-24 md:pt-16 lg:px-12">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#e9eee2] px-3.5 py-2 text-xs font-semibold text-[#446144]"><Sparkles size={14} /> Fresquinho, local e cheio de carinho</div>
            <h1 className="text-[clamp(3.2rem,8vw,6.2rem)] font-semibold leading-[.96] tracking-[-.075em]">A feira boa<br />vem até <span className="serif-italic text-[#df8052]">você.</span></h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#697365]">Escolhas frescas de quem planta com cuidado. Monte sua sacola e receba o melhor da estação em casa.</p>
            <a href="#produtos" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#244d31] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#183e25]">Escolher meus produtos <ArrowRight size={17} /></a>
            <div className="mt-10 flex items-center gap-3 text-xs text-[#71806d]"><span className="flex -space-x-2"><i className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7f7f2] bg-[#efd9c2] not-italic">👩🏽‍🌾</i><i className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7f7f2] bg-[#e4d9c9] not-italic">👨🏻‍🌾</i><i className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#f7f7f2] bg-[#e8dfcc] not-italic">👩🏼‍🌾</i></span><span>Direto de pequenos produtores locais</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[510px]">
            <div className="hero-blob relative aspect-[1.07] overflow-hidden rounded-[42%_48%_43%_48%] bg-[#e7eadc]">
              <div className="absolute inset-0 grid grid-cols-2 place-items-center px-8 py-10">
                <span className="produce produce-one">🥬</span><span className="produce produce-two">🍊</span><span className="produce produce-three">🥑</span><span className="produce produce-four">🍅</span><span className="produce produce-five">🥕</span><span className="produce produce-six">🍋</span>
              </div>
              <div className="absolute bottom-[13%] left-[21%] right-[20%] h-10 rounded-[50%] bg-[#52634a]/20 blur-xl" />
              <div className="basket absolute bottom-[15%] left-1/2 grid h-[31%] w-[51%] -translate-x-1/2 place-items-center rounded-b-[42%] rounded-t-[22%] border-[9px] border-[#a9693c] bg-gradient-to-b from-[#d59b5e] to-[#b97843] shadow-xl"><span className="absolute -top-5 h-9 w-[84%] rounded-[50%] border-[9px] border-b-0 border-[#a9693c]" /><span className="relative mt-3 text-5xl">🥕🥬</span></div>
            </div>
            <div className="absolute -left-2 top-[13%] rounded-2xl bg-white px-4 py-3 shadow-[0_12px_35px_#34452c18] sm:-left-8"><span className="block text-[10px] font-semibold uppercase tracking-[.14em] text-[#8a9684]">colhido hoje</span><span className="mt-1 block text-sm font-bold">Fresquinho de verdade</span></div>
            <div className="absolute -bottom-4 right-2 flex items-center gap-2 rounded-2xl bg-[#f1d6c4] px-4 py-3 text-xs font-semibold text-[#704d38] shadow-[0_12px_35px_#34452c18] sm:right-0"><Leaf size={15} /> 100% da estação</div>
          </div>
        </section>

        <section id="produtos" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
              <div><span className="text-xs font-bold uppercase tracking-[.18em] text-[#df8052]">A feira da semana</span><h2 className="mt-2 text-3xl font-semibold tracking-[-.055em] sm:text-4xl">Escolhas fresquinhas</h2><p className="mt-2 text-sm text-[#778073]">Pequenos lotes, grandes sabores.</p></div>
              <span className="hidden items-center gap-1 text-xs text-[#82907e] sm:flex"><Leaf size={14} /> Cultivado com cuidado</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <article key={product.id} className="group rounded-[25px] border border-[#edf0e9] bg-[#fdfdfa] p-3.5 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_#253f2410]">
                  <div className={`product-art relative grid aspect-[1.3] place-items-center overflow-hidden rounded-[19px] ${product.color}`}><span className="product-emoji">{product.emoji}</span>{product.tag && <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-[#55664f]">{product.tag}</span>}<span className="absolute bottom-2 right-3 text-[10px] font-medium text-[#5e6757]/60">da horta</span></div>
                  <div className="px-1 pb-1 pt-4"><div className="flex items-start justify-between gap-2"><div><h3 className="text-sm font-bold">{product.name}</h3><p className="mt-1 text-xs text-[#899084]">{product.detail}</p></div><span className="shrink-0 text-sm font-bold">{money(product.price)}</span></div>
                    <button onClick={() => addToCart(product)} className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold transition ${justAdded === product.id ? 'bg-[#e6efe4] text-[#315739]' : 'bg-[#edf0e8] text-[#314b34] hover:bg-[#244d31] hover:text-white'}`} aria-label={`Adicionar ${product.name} à sacola`}>{justAdded === product.id ? <><Check size={15} /> Adicionado!</> : <><Plus size={15} /> Adicionar à sacola</>}</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="sacola" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[1.15fr_.85fr] md:py-20 lg:px-12">
          <div>
            <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#e9eee2] text-[#315739]"><ShoppingBasket size={20} /></span><div><span className="text-xs font-bold uppercase tracking-[.16em] text-[#df8052]">Sua seleção</span><h2 className="text-2xl font-semibold tracking-[-.05em]">Sua sacola <span className="text-[#9aa493]">({itemCount})</span></h2></div></div>
            <div className="mt-6 divide-y divide-[#e5e9df] rounded-[24px] border border-[#e5e9df] bg-white px-5">
              {cart.length === 0 ? <div className="py-10 text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#f2f4ed] text-[#81917c]"><ShoppingBag size={21} /></span><p className="mt-3 text-sm font-semibold">Sua sacola está esperando</p><p className="mt-1 text-xs text-[#8b9486]">Adicione seus produtos favoritos da feira.</p></div> : cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-4"><span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl ${item.color}`}>{item.emoji}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{item.name}</p><p className="mt-1 text-xs text-[#899084]">{money(item.price)} / unidade</p></div><div className="flex items-center gap-2 rounded-full bg-[#f4f5f0] p-1"><button onClick={() => changeQuantity(item.id, -1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white" aria-label={`Diminuir ${item.name}`}><Minus size={13} /></button><span className="w-4 text-center text-xs font-bold">{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white" aria-label={`Aumentar ${item.name}`}><Plus size={13} /></button></div><span className="w-[72px] text-right text-sm font-bold">{money(item.price * item.quantity)}</span><button onClick={() => removeItem(item.id)} className="ml-1 text-[#a0a79d] transition hover:text-[#bd6153]" aria-label={`Remover ${item.name}`}><Trash2 size={16} /></button></div>
              ))}
              <div className="flex items-center justify-between py-4"><span className="text-sm font-semibold">Total da sacola</span><span className="text-lg font-bold tracking-tight">{money(total)}</span></div>
            </div>
          </div>
          <div className="self-start rounded-[26px] bg-[#e9eee2] p-6 sm:p-7">
            <div className="flex items-center justify-between"><div><span className="text-xs font-bold uppercase tracking-[.15em] text-[#6f846a]">Quase lá</span><h2 className="mt-1 text-2xl font-semibold tracking-[-.05em]">Finalizar pedido</h2></div><span className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-[#4a6846]"><ArrowDown size={19} /></span></div>
            <p className="mt-2 text-xs leading-5 text-[#71806d]">Deixe seus dados e a gente prepara tudo fresquinho para você.</p>
            <form className="mt-6 space-y-3.5" onSubmit={handleCheckout} noValidate>
              <div><label className="mb-1.5 block text-xs font-semibold text-[#485a44]" htmlFor="customer-name">Seu nome</label><input id="customer-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Como podemos te chamar?" className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#b3baaf] focus:border-[#65805c] ${nameInvalid ? 'border-red-500 ring-2 ring-red-100' : 'border-[#dce3d6]'}`} aria-invalid={nameInvalid} aria-describedby={nameInvalid ? 'name-error' : undefined} />{nameInvalid && <p id="name-error" className="mt-1.5 text-xs font-medium text-red-600">O nome é obrigatório para continuar.</p>}</div>
              <div><label className="mb-1.5 block text-xs font-semibold text-[#485a44]" htmlFor="customer-email">E-mail</label><input id="customer-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" className={`w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#b3baaf] focus:border-[#65805c] ${emailInvalid ? 'border-red-500 ring-2 ring-red-100' : 'border-[#dce3d6]'}`} aria-invalid={emailInvalid} aria-describedby={emailInvalid ? 'email-error' : undefined} />{emailInvalid && <p id="email-error" className="mt-1.5 text-xs font-medium text-red-600">Digite um e-mail válido.</p>}</div>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#244d31] py-3.5 text-sm font-semibold text-white transition hover:bg-[#183e25]">Confirmar pedido <ChevronRight size={17} /></button>
              {submitted && cart.length === 0 && <p className="text-center text-xs font-medium text-red-600">Adicione pelo menos um produto à sacola.</p>}
              <p className="text-center text-[10px] text-[#7c8977]">Entrega combinada com você · pagamento na entrega</p>
            </form>
          </div>
        </section>

        <section id="como-funciona" className="border-t border-[#e6e9e0] bg-white py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><div><span className="text-xs font-bold uppercase tracking-[.17em] text-[#df8052]">Feito para aprender</span><h2 className="mt-1 text-xl font-semibold tracking-[-.04em]">Um clique de cada vez 🌱</h2><p className="mt-1 text-xs text-[#7b8576]">Exercício guiado: veja o useState atualizando o contador em tempo real.</p></div><div className="flex items-center gap-3 rounded-2xl border border-[#e7ebe2] bg-[#fafbf8] p-2"><button onClick={() => setCount((current) => current - 1)} className="grid h-9 w-9 place-items-center rounded-xl text-[#486246] transition hover:bg-[#e9eee2]" aria-label="Diminuir contador"><Minus size={17} /></button><span className="min-w-10 text-center text-xl font-bold tabular-nums">{count}</span><button onClick={() => setCount((current) => current + 1)} className="grid h-9 w-9 place-items-center rounded-xl bg-[#244d31] text-white transition hover:bg-[#183e25]" aria-label="Aumentar contador"><Plus size={17} /></button><button onClick={() => setCount(0)} className="ml-1 rounded-xl px-3 py-2 text-xs font-semibold text-[#778172] hover:bg-[#e9eee2]">Zerar</button></div></div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[#8b9386] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"><span>© 2026 Viva Feira · carinho que vem da terra.</span><a href="#inicio" className="font-medium transition hover:text-[#315739]">Feito com cuidado <CircleHelp size={13} className="ml-1 inline" /></a></footer>

      {orderDone && <div className="fixed inset-0 z-20 grid place-items-center bg-[#152219]/40 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="success-title"><div className="relative w-full max-w-sm rounded-[28px] bg-white p-8 text-center shadow-2xl"><button onClick={() => setOrderDone(false)} className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[#f2f4ed] text-[#697365]" aria-label="Fechar"><X size={16} /></button><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e8f1e4] text-[#315739]"><Check size={27} /></span><h2 id="success-title" className="mt-5 text-2xl font-semibold tracking-[-.05em]">Pedido confirmado!</h2><p className="mt-2 text-sm leading-6 text-[#7a8475]">Sua feira vai chegar fresquinha. Obrigado pela confiança! 💚</p><button onClick={() => setOrderDone(false)} className="mt-6 w-full rounded-full bg-[#244d31] py-3 text-sm font-semibold text-white hover:bg-[#183e25]">Continuar na feira</button></div></div>}
    </div>
  )
}

export default App

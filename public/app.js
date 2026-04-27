// ============================================
// PARTE 1 - CONEXÃO COM SEU BACKEND (EXPRESS)
// ============================================
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const badgeElement = document.getElementById('badge');

async function fetchCarrinho() {
    try {
        const response = await fetch('/cart');
        const data = await response.json();
        atualizarSidebarCarrinho(data.produtos, data.valorTotal);
    } catch (e) {
        console.error("Erro na API GET:", e);
    }
}

async function adicionarAoCarrinho(nome, preco) {
    try {
        await fetch('/cart/item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco })
        });
        fetchCarrinho();
    } catch (e) {
        console.error("Erro no POST:", e);
    }
}

async function removerDoCarrinho(nome) {
    try {
        await fetch(`/cart/item/${nome}`, { method: 'DELETE' });
        fetchCarrinho();
    } catch (e) {
        console.error("Erro no DELETE:", e);
    }
}

function atualizarSidebarCarrinho(produtos, valorTotal) {
    badgeElement.innerText = produtos.length;
    cartTotalElement.innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    cartItemsContainer.innerHTML = '';
    
    if (produtos.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color: #64748b; margin-top:2rem;">Cesta vazia</p>';
        return;
    }

    produtos.forEach(p => {
        const produtoLocal = catalogoDeProdutos.find(item => item.nome === p.nome);
        const urlFoto = produtoLocal ? produtoLocal.img : 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100';

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${urlFoto}" alt="${p.nome}" class="cart-item-img">
                <div class="item-details">
                    <h4>${p.nome}</h4>
                    <div class="item-price">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
                </div>
                <button class="remove-btn" onclick="removerDoCarrinho('${p.nome}')">✖</button>
            </div>
        `;
    });
}
fetchCarrinho();

// ============================================
// PARTE 2 - NOVO MEGA BANCO DE DADOS & FILTROS SUPERIORES
// ============================================

const catalogoDeProdutos = [
    // CAMISETAS
    { nome: "T-Shirt Minimal Branca", preco: 70, tamanho: "P", categoria: "camiseta", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { nome: "T-Shirt Minimal Branca", preco: 70, tamanho: "M", categoria: "camiseta", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { nome: "T-Shirt Graphic Black", preco: 120, tamanho: "M", categoria: "camiseta", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400" },
    { nome: "T-Shirt Graphic Black", preco: 120, tamanho: "G", categoria: "camiseta", img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400" },
    { nome: "Oversized Vintage", preco: 150, tamanho: "GG", categoria: "camiseta", img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=400" },

    // MOLETONS E JAQUETAS
    { nome: "Jaqueta Corta-Vento Elite", preco: 350, tamanho: "P", categoria: "moletom", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { nome: "Jaqueta Corta-Vento Elite", preco: 350, tamanho: "M", categoria: "moletom", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { nome: "Moletom Canguru Basic", preco: 280, tamanho: "M", categoria: "moletom", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400" },
    { nome: "Jaqueta Puffer Black", preco: 480, tamanho: "G", categoria: "moletom", img: "https://images.unsplash.com/photo-1515347619362-fdfdd4bb1214?w=400" },
    { nome: "Jaqueta Puffer Black", preco: 480, tamanho: "GG", categoria: "moletom", img: "https://images.unsplash.com/photo-1515347619362-fdfdd4bb1214?w=400" },

    // CALÇAS
    { nome: "Calça Jogger Tech", preco: 180, tamanho: "P", categoria: "calca", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
    { nome: "Calça Jogger Tech", preco: 180, tamanho: "M", categoria: "calca", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400" },
    { nome: "Calça Cargo Premium", preco: 350, tamanho: "M", categoria: "calca", img: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&q=80&w=400" },
    { nome: "Jeans Slim Fit", preco: 250, tamanho: "G", categoria: "calca", img: "https://images.unsplash.com/photo-1542272604-780c96859336?auto=format&fit=crop&q=80&w=400" },

    // CALÇADOS
    { nome: "Sneaker Sport Boost", preco: 600, tamanho: "38", categoria: "tenis", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { nome: "Sneaker Sport Boost", preco: 600, tamanho: "39", categoria: "tenis", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { nome: "Air Runner Max", preco: 750, tamanho: "40", categoria: "tenis", img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=400" },
    { nome: "Slip-On Street", preco: 290, tamanho: "40", categoria: "tenis", img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400" },
    { nome: "Sneaker Urban Green", preco: 420, tamanho: "41", categoria: "tenis", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400" },
    { nome: "Sneaker Urban Green", preco: 420, tamanho: "42", categoria: "tenis", img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400" },
    
    // ACESSÓRIOS
    { nome: "Boné Classic Preto", preco: 90, tamanho: "Unico", categoria: "acessorio", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400" },
    { nome: "Mochila Tech Bag", preco: 250, tamanho: "Unico", categoria: "acessorio", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400" },
    { nome: "Meia Cano Alto (Kit)", preco: 45, tamanho: "Unico", categoria: "acessorio", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&q=80&w=400" }
];

// O estado de precisão cirúrgica do filtro
let activeFilters = {
    minPrice: null,
    maxPrice: null,
    tamanhoAtivo: null,
    categoriaAtiva: null
};

const domMinPrice = document.getElementById('min-price');
const domMaxPrice = document.getElementById('max-price');

domMinPrice.addEventListener('input', (e) => {
    activeFilters.minPrice = e.target.value ? Number(e.target.value) : null;
    filtrarVitrines();
});
domMaxPrice.addEventListener('input', (e) => {
    activeFilters.maxPrice = e.target.value ? Number(e.target.value) : null;
    filtrarVitrines();
});

// Listener "Esquizofrênico": Se você liga o botão da Categoria X, desliga os da Y automaticamente.
document.querySelectorAll('.size-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if(e.target.classList.contains('active')) {
            e.target.classList.remove('active');
            activeFilters.tamanhoAtivo = null;
            activeFilters.categoriaAtiva = null;
        } else {
            // Desliga a luz de TOOOODOS os botões da barra, de qualquer categoria
            document.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
            
            // Acende só o que bateu!
            e.target.classList.add('active');
            activeFilters.tamanhoAtivo = e.target.dataset.value;
            activeFilters.categoriaAtiva = e.target.dataset.cat;
        }
        filtrarVitrines();
    });
});

document.getElementById('clear-filters').addEventListener('click', () => {
    activeFilters = { minPrice: null, maxPrice: null, tamanhoAtivo: null, categoriaAtiva: null };
    domMinPrice.value = '';
    domMaxPrice.value = '';
    document.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
    filtrarVitrines();
});

function filtrarVitrines() {
    let result = catalogoDeProdutos;
    
    // Filtros de Preço Universais
    if (activeFilters.minPrice !== null) result = result.filter(p => p.preco >= activeFilters.minPrice);
    if (activeFilters.maxPrice !== null) result = result.filter(p => p.preco <= activeFilters.maxPrice);
    
    // Filtro Cruzado: Apenas a categoria e o tamanho exato daquele clique
    if (activeFilters.tamanhoAtivo !== null) {
        result = result.filter(p => p.tamanho === activeFilters.tamanhoAtivo && p.categoria === activeFilters.categoriaAtiva);
    }
    
    desenharVitrines(result);
}

function desenharVitrines(produtosParaExibir) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    
    if(produtosParaExibir.length === 0) {
        grid.innerHTML = '<h2 style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); margin-top: 5rem;">Quebramos a banca! Nenhum produto encontrado nesta configuração :/</h2>';
        return;
    }

    produtosParaExibir.forEach(produto => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="image-wrapper">
                    <img src="${produto.img}" class="product-img" alt="${produto.nome}">
                    <span class="tamanho-badge">${produto.tamanho}</span>
                </div>
                <div class="product-info">
                    <h3>${produto.nome}</h3>
                    <p class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <button class="add-to-cart-btn" onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">
                    <span>+ Cesta</span>
                </button>
            </div>
        `;
    });
}

// Rodar na primeira visita do usuario
filtrarVitrines();

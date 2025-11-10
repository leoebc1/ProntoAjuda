// services/recipeService.ts

export type Receita = {
    id: string
    nome: string
    imagem: string
    categoria: string
    instrucoes: string
}

export async function buscarReceitasAleatorias(): Promise<Receita[]> {
    try {
        const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")

        const dados = await resp.json()
        if (!dados.meals || !Array.isArray(dados.meals)) return []

        return dados.meals.map((r: any) => ({
            id: r.idMeal,
            nome: r.strMeal,
            imagem: r.strMealThumb,
            categoria: r.strCategory || "Geral",
            instrucoes: r.strInstructions || "Instruções não disponíveis"
        }))
    } catch (erro) {
        console.error("Erro em buscarReceitasAleatorias: ", erro)
        return receitasFallback
    }
}

export async function buscarReceitasPorCategoria(categoria: string): Promise<Receita[]> {
    try {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`)

        const dados = await resp.json()
        if (!dados.meals || !Array.isArray(dados.meals)) return []

        // Pega apenas as primeiras 6 receitas da categoria
        return dados.meals.slice(0, 6).map((r: any) => ({
            id: r.idMeal,
            nome: r.strMeal,
            imagem: r.strMealThumb,
            categoria: categoria,
            instrucoes: "Clique para ver instruções completas"
        }))
    } catch (erro) {
        console.error("Erro em buscarReceitasPorCategoria: ", erro)
        return receitasFallback.filter(r => r.categoria === categoria)
    }
}

export async function buscarReceitasPorNome(nome: string): Promise<Receita[]> {
    try {
        const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`)

        const dados = await resp.json()
        if (!dados.meals || !Array.isArray(dados.meals)) return []

        return dados.meals.map((r: any) => ({
            id: r.idMeal,
            nome: r.strMeal,
            imagem: r.strMealThumb,
            categoria: r.strCategory || "Geral",
            instrucoes: r.strInstructions || "Instruções não disponíveis"
        }))
    } catch (erro) {
        console.error("Erro em buscarReceitasPorNome: ", erro)
        return receitasFallback.filter(r => 
            r.nome.toLowerCase().includes(nome.toLowerCase())
        )
    }
}

// Receitas de fallback para quando a API estiver offline
const receitasFallback: Receita[] = [
    {
        id: "1",
        nome: "Omelete Simples",
        imagem: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        categoria: "Vegetariano",
        instrucoes: "Bata os ovos, tempere e leve à frigideira antiaderente."
    },
    {
        id: "2", 
        nome: "Arroz Branco",
        imagem: "https://www.themealdb.com/images/media/meals/1543774956.jpg",
        categoria: "Acompanhamento",
        instrucoes: "Lave o arroz, refogue com alho e cozinhe com água e sal."
    },
    {
        id: "3",
        nome: "Salada Verde",
        imagem: "https://www.themealdb.com/images/media/meals/1549542867.jpg", 
        categoria: "Salada",
        instrucoes: "Lave as folhas, corte os legumes e tempere com azeite e limão."
    }
]
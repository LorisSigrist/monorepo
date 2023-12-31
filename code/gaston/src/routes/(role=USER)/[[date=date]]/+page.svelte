<script>
    export let data; 

    /** @type {number[]}*/
    let cart = [];

    const Money = new Intl.NumberFormat('de-CH', {
        style: 'currency',
        currency: 'CHF',
    });

    $: total = data.items
            .filter(item => cart.includes(item.id))
            .reduce((acc, item) => acc + item.price, 0);
</script>

<form class="text-center grid gap-8 justify-center">
    <h1 class="text-2xl font-bold">Menu for {data.date.toLocaleDateString("de")}</h1>

    <section class="grid gap-4">
        {#each data.items as item}
            <label>
                <h3 class="text-lg font-bold">{item.title}</h3>
                <p>{item.description}</p>
                <p>{Money.format(item.price)}</p>
                <input 
                    type="checkbox" 
                    name="menu-items"
                    value={item.id} 
                    bind:group={cart} 
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" 
                />
            </label>
        {/each}
    </section>

    <div class="font-bold">
        <span>Total {Money.format(total)}</span>
    </div>

    <button type="submit" class="bg-indigo-600 text-white rounded px-4 py-2">Bestellen</button>
</form>




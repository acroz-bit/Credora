 async function fetchCryptoPrices() {
        const cryptoTableBody = document.getElementById('crypto-table-body');
        const searchInput = document.getElementById('coin-search');
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
            if (!response.ok) throw new Error(`API request failed`);
            const allCoins = await response.json();
            
            function displayCoins(coins) {
                cryptoTableBody.innerHTML = ''; 
                if (coins.length === 0) {
                    cryptoTableBody.innerHTML = '<tr><td colspan="5">No coins found.</td></tr>';
                    return;
                }
                coins.forEach((coin, index) => {
                    const priceChange = coin.price_change_percentage_24h;
                    const priceChangeClass = priceChange >= 0 ? 'positive' : 'negative';
                    const priceChangeSymbol = priceChange >= 0 ? '▲' : '▼';
                    const row = `
                        <tr>
                            <td>${coin.market_cap_rank}</td>
                            <td class="coin-name"><img src="${coin.image}" alt="${coin.name}" width="24" height="24"> <span>${coin.name} <span class="symbol">(${coin.symbol.toUpperCase()})</span></span></td>
                            <td>$${coin.current_price.toLocaleString()}</td>
                            <td class="${priceChangeClass}">${priceChangeSymbol} ${Math.abs(priceChange).toFixed(2)}%</td>
                            <td>$${coin.market_cap.toLocaleString()}</td>
                        </tr>`;
                    cryptoTableBody.innerHTML += row;
                });
            }

            displayCoins(allCoins);

            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredCoins = allCoins.filter(coin => 
                    coin.name.toLowerCase().includes(searchTerm) || 
                    coin.symbol.toLowerCase().includes(searchTerm)
                );
                displayCoins(filteredCoins);
            });

        } catch (error) {
            cryptoTableBody.innerHTML = '<tr><td colspan="5">Could not load data. Please try again later.</td></tr>';
        }
    }
    fetchCryptoPrices();

    // Coin Calculator Function
    function calculate() {
        let amt = document.getElementById("amount").value;
        let price = document.getElementById("coin").value;

        if (amt === "" || amt <= 0) {
            document.getElementById("result").innerText = "0 coins";
            return;
        }

        let coins = amt / price;

        document.getElementById("result").innerText = coins.toFixed(6) + " coins";
    }
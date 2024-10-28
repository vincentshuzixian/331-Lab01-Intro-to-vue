const productDisplay = {
    template: /*html*/ `
        <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img :src="image" alt="Product Image">
                </div>
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock > 10">In Stock</p>
                <p v-else-if="inStock <= 10 && inStock > 0">Almost out of Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <ul>
                    <li v-for="detail in details" :key="detail">{{ detail }}</li>
                </ul>
                <div 
                    v-for="(variant, index) in variants" 
                    :key="variant.id" 
                    @mouseover="updateVariant(index)" 
                    class="color-circle" 
                    :style="{ backgroundColor: variant.color }">
                </div>
                <button 
                    class="button" 
                    :disabled="!inStock" 
                    @click="addToCart" 
                    :class="{ disabledButton: !inStock }">
                    Add To Cart
                </button>
                <button 
                    class="button remove-button" 
                    @click="removeFromCart">
                    Remove From Cart
                </button>
            </div>
            <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>
    `,
    props: {
        premium: Boolean,
    },
    setup(props, { emit }) {
        const product = ref('Boots');
        const brand = ref('SE 331');
        const selectedVariant = ref(0);
        const details = ref(['50% cotton', '30% wool', '20% polyester']);
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ]);
        
        const reviews = ref([]); // 在这里定义 reviews 数组
        const image = computed(() => variants.value[selectedVariant.value].image);
        const inStock = computed(() => variants.value[selectedVariant.value].quantity);  // 注意这里
        const title = computed(() => `${brand.value} ${product.value}`);
        const shipping = computed(() => (props.premium ? 'Free' : 30));  // 修正位置

        function updateVariant(index) {
            selectedVariant.value = index;
        }

        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id); 
        }

        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id); 
        }

        function addReview(review) {
            reviews.value.push(review); // 确保这使用正确的 reviews 数组
        }

        return {
            title,
            image,
            inStock,  // 暴露 inStock
            details,
            variants,
            shipping,
            updateVariant,
            addToCart,
            removeFromCart,
            reviews,  // 暴露 reviews
            addReview, // 暴露 addReview
        };
    },
};

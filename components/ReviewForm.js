const { reactive } = Vue;

const reviewForm = {
    template: /*html*/ `
        <form class="review-form" @submit.prevent="onSubmit">
            <h3>Leave a review</h3>

            <label for="name">Name:</label>
            <input id="name" v-model="form.name" />

            <label for="review">Review:</label>
            <textarea id="review" v-model="form.review"></textarea>

            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="form.rating">
                <option value="">Select rating</option> <!-- 添加默认选项 -->
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

            <label>Would you recommend this product?</label>
            <input type="radio" value="Yes" v-model="form.recommend" /> Yes
            <input type="radio" value="No" v-model="form.recommend" /> No

            <input class="button" type="submit" value="Submit" />
        </form>
    `,
    setup(props, { emit }) {
        const form = reactive({
            name: '',
            review: '',
            rating: null,
            recommend: '' // 添加 recommend 属性
        });

        function onSubmit() {
            if (form.name === '' || form.review === '' || form.rating === null) {
                alert('Review is incomplete. Please fill out every field.');
                return;
            }
            const productReview = {
                name: form.name,
                review: form.review,
                rating: form.rating,
                recommend: form.recommend // 添加 recommend 到 productReview
            };
            emit('review-submitted', productReview);
            form.name = '';
            form.review = '';
            form.rating = null;
            form.recommend = ''; // 重置 recommend
        }

        return {
            form,
            onSubmit
        };
    }
};

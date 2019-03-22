var app = new Vue({ 
    el: '#app',
    data: {
        message: '',
        loading: false,
        items: [
            {
                question: 'Какой-то вопрос',
                answer: 'Некий ответ'
            }
        ]
    },
    methods: {
        sendQuestion: function () {
          if (!this.message) return
          this.items.push({
              question: this.message,
              answer: null
          })
          this.loading = true
          const body = new URLSearchParams();
          body.append('q', this.message);
          axios.post('/api/get-answer', body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
          .then( (response) => {    
            this.loading = false
            this.message = ''
            if (response.data.ok) {
                this.changeItemAnswer(this.items.length-1, response.data.a)
            } else {
                this.changeItemAnswer(this.items.length-1, 'Нет ответа')
            }
          })
          .catch((error) => {
            this.loading = false
            this.changeItemAnswer(this.items.length-1, 'Нет ответа')
          })     
        },
        clearAll: function () {
            this.items = []
        },
        changeItemAnswer: function (index, value) {
            Vue.set(this.items, index, {
                question: this.items[index].question,
                answer: value
            })
        }
      },
});
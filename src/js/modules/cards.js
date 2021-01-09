import { getResource} from '../services/services';
function cards() {
    // menu cards
    const cardContainer = document.querySelector('.menu__field > .container');
    // console.log(cardContainer);

    class MenuCard {
        constructor(imageURL, alt, plan, descr, price, parentSelector, ...classes) {
            this.imageURL = imageURL;
            this.alt = alt;
            this.plan = plan;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        render() {

            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add('menu__item', className));
            }

            // console.log(this.classes);

            element.innerHTML = `
               <img src="${this.imageURL}" alt="${this.alt}">
               <h3 class="menu__item-subtitle">${this.plan}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>`;
            this.parent.append(element);
        }

    }


    /* getResource('http://localhost:3000/menu')
       .then(data => {
          data.forEach(({ img, altimg, title, descr, price }) => {
             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
          });
       }); */

    /* getResource('http://localhost:3000/menu')
       .then(data => createCard(data)); */

    axios.get('http://localhost:3000/menu')
        .then(data => {
            createCard(data.data);
        });

    function createCard(data) {
        data.forEach(({ img, altimg, title, descr, price }) => {
            const element = document.createElement('div');
            price = (+price * 27.8).toFixed(2);
            element.classList.add('menu__item');
            element.innerHTML = `
               <img src="${img}" alt="${altimg}">
               <h3 class="menu__item-subtitle">${title}</h3>
               <div class="menu__item-descr">${descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${price}</span> грн/день</div>
               </div>`;
            document.querySelector('.menu .container').append(element);
        });
    }


}

export default cards;
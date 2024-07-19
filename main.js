document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  const orderAmount = document.querySelector('.order-amount');
  const submitBtn = document.querySelector('.submit-btn');

  serviceCards.forEach((card) => {
    card.addEventListener('click', () => {
      // 切換 active class 給點擊的 card
      card.classList.toggle('active');

      // 獲取對應的 dot 元素
      const cardImgClass = card.querySelector('.card-img').classList[1];
      const dot = document.querySelector(`.dot-${cardImgClass}`);

      // 切換 dot 的顯示狀態
      if (dot) {
        if (card.classList.contains('active')) {
          dot.style.display = 'block';
        } else {
          dot.style.display = 'none';
        }
      }

      // 更新 order-amount
      const activeCards = document.querySelectorAll('.service-card.active');
      const activeCount = activeCards.length;
      orderAmount.textContent = activeCount;

      // 顯示或隱藏 submit-btn
      submitBtn.style.display = activeCount > 0 ? 'block' : 'none';
    });
  });
});
/* 
// Create result table
function createFlexMessage(selectedItems) {
  const tableHtml = `
        <table border="1" style="width:100%; border-collapse:collapse;">
          <thead>
            <tr>
              <th>大小姐您的清單</th>
            </tr>
          </thead>
          <tbody>
            ${selectedItems.map((item) => `<tr><td>${item}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
  return tableHtml;
}
 */

function createFlexMessage(selectedItems) {
  const header = {
    type: 'box',
    layout: 'horizontal',
    contents: [
      {
        type: 'text',
        text: '項目名稱',
        weight: 'bold',
        size: 'sm',
        color: '#1DB446',
        align: 'center',
      },
    ],
  };

  const rows = selectedItems.map((item) => ({
    type: 'box',
    layout: 'horizontal',
    contents: [
      {
        type: 'text',
        text: item,
        size: 'sm',
        color: '#555555',
        align: 'center',
      },
    ],
  }));

  return [
    {
      type: 'flex',
      altText: 'Selected Items',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [header, ...rows],
        },
      },
    },
  ];
}

function callTutu() {
  const activeCards = document.querySelectorAll('.service-card.active');
  const selectedItems = Array.from(activeCards).map((card) => {
    return card.querySelector('.card-title').textContent;
  });

  let message = createFlexMessage(selectedItems);
  console.log(selectedItems);

  liff
    .sendMessages(message)
    .then(() => {
      liff.closeWindow();
    })
    .catch((err) => {
      console.error(err.code, err.message);
    });
  // 在這裡處理選擇的項目列表
}

const foods = [
    { name: 'Cơm', calories: 200 },
    { name: 'Gà', calories: 300 },
    { name: 'Rau xanh', calories: 50 },
    // Thêm các món ăn khác...
  ];
  
  const calculateMealCombos = (nhuCau, suggestedCalories) => {
    const combos = [];
  
    // Số lượng calories cho mỗi bữa ăn (giả sử 3 bữa ăn)
    const caloriesPerMeal = suggestedCalories / 3;
  
    // Lặp qua tất cả các món ăn để tạo combo
    for (let i = 0; i < foods.length; i++) {
      for (let j = 0; j < foods.length; j++) {
        for (let k = 0; k < foods.length; k++) {
          const totalCalories = foods[i].calories + foods[j].calories + foods[k].calories;
  
          // Kiểm tra xem tổng calo của combo có nằm trong khoảng cho phép hay không
          if (totalCalories >= caloriesPerMeal - 50 && totalCalories <= caloriesPerMeal + 50) {
            combos.push({
              mainDish: foods[i],
              sideDish: foods[j],
              dessert: foods[k],
              totalCalories: totalCalories,
            });
          }
        }
      }
    }
  
    return combos;
  };
// app.js

const { trainDecisionTree } = require('./decisionTree');
const { calculateMealCombos } = require('./mealCombos');

// Hàm tính toán lượng calories dựa trên dữ liệu người dùng (đã cung cấp ở trên)
const calculateCalories = require('./calculateCalories');

// Hàm sử dụng mô hình cây quyết định để dự đoán nhu cầu (đã cung cấp ở trên)
const predictNhuCau = require('./predictNhuCau');

// Dữ liệu đào tạo (ví dụ)
const trainingData = [
  { cannang: 60, chieucao: 170, tuoi: 25, gioitinh: 'Nam', vandong: 'vua', nhucau: 'tăng cân' },
  // Thêm các mẫu khác tương tự...
];

// Bước 1: Huấn luyện cây quyết định
const decisionTreeModel = trainDecisionTree(trainingData);

// Dữ liệu người dùng (đã cung cấp ở trên)
const userData = { cannang: 70, chieucao: 175, tuoi: 30, gioitinh: 'Nam', vandong: 'vua' };

// Bước 2: Dự đoán nhu cầu
const predictedNhuCau = predictNhuCau(userData, decisionTreeModel);

// Bước 3: Tính toán lượng calories dựa trên nhu cầu đã dự đoán
const suggestedCalories = calculateCalories({ ...userData, nhucau: predictedNhuCau });

// Bước 4: Tính toán combo món ăn dựa trên nhu cầu và lượng calories
const mealCombos = calculateMealCombos(predictedNhuCau, suggestedCalories);

console.log('Nhu cầu dự đoán:', predictedNhuCau);
console.log('Combo món ăn gợi ý:', mealCombos);

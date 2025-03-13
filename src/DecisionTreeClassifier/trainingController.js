const DecisionTree = require('decision-tree');

// Dữ liệu đào tạo
// Tạo dữ liệu huấn luyện cho cây quyết định
const trainingData = [
  { input: { bmr: 1500, tdee: 1800, bmi: 22, bmiCategory: 'Bình thường' }, output: 'giảm cân' },
  { input: { bmr: 1800, tdee: 2000, bmi: 26, bmiCategory: 'Thừa cân' }, output: 'giữ cân' },
  { input: { bmr: 2000, tdee: 2200, bmi: 30, bmiCategory: 'Béo phì' }, output: 'tăng cân' },
  // Thêm dữ liệu huấn luyện khác nếu cần thiết
];

// Trích xuất đặc trưng và nhãn từ dữ liệu huấn luyện
const features = trainingData.map(data => data.input);
const labels = trainingData.map(data => data.output);

// Huấn luyện cây quyết định
const decisionTree = new DecisionTreeID3(features, labels);

// Dự đoán sử dụng cây quyết định
const userData = {
  bmr: calculateBMR(cannang, chieucao, tuoi, gioitinh),
  tdee: calculateTDEE(bmr, activityLevel),
  bmi: calculateBMI(cannang, chieucao),
  bmiCategory: calculateBMICategory(bmi),
};

const predictedOutput = decisionTree.predict(userData);

// Sử dụng predictedOutput trong phản hồi của bạn
res.json({
  bmr,
  tdee,
  bmi,
  bmiCategory,
  // suggestedCalories,
  // mealCombos,
  // sortedCombos,
  predictedOutput,
});

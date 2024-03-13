class StudentManager {

    constructor() {
        this.localStorageHandler = new LocalStorageHandler('students');
        this.classesByBlock = {
            "12": ["12A", "12B"],
            "11": ["11A", "11B"],
            "10": ["10A", "10B"]
        };
        this.gender = {
            "1": "Nam",
            "2": "Nữ",
            "0": "Khác"
        }
    }
    // Phương thức để thêm một sinh viên mới vào local storage
    addStudent(student) {
        this.localStorageHandler.addItem(student);
    }

    // Phương thức để lấy danh sách sinh viên từ local storage
    getStudents() {
        return this.localStorageHandler.getData();
    }

    // Phương thức để cập nhật thông tin của một sinh viên trong local storage
    updateStudent(index, updatedStudent) {
        this.localStorageHandler.updateItem(index, updatedStudent);
    }

    // Phương thức để xóa một sinh viên khỏi local storage
    deleteStudent(index) {
        this.localStorageHandler.deleteItem(index);
    }
    //hàm tính trung bình
    calculateAverageScore(mathScore, physicsScore, chemistryScore) {
        // Convert scores to numbers
        const math = parseFloat(mathScore);
        const physics = parseFloat(physicsScore);
        const chemistry = parseFloat(chemistryScore);

        // Calculate total score
        const totalScore = math + physics + chemistry;

        // Calculate average score
        const averageScore = totalScore / 3;

        // Return the average score
        return averageScore.toFixed(2); // Return with two decimal places
    }
    // Hàm format ngày tháng
    formatDate(dateString) {
        let dateParts = dateString.split('-');
        let year = dateParts[0];
        let month = dateParts[1];
        let day = dateParts[2];
        return `${day}/${month}/${year}`;
    }
    searchStudent(name) {
        // Truy xuất danh sách tất cả học sinh
        const allStudents = this.getStudents();

        // Lọc danh sách học sinh dựa trên xem tên đầy đủ của họ có chứa tên được cung cấp hay không
        const filteredStudents = allStudents.filter(student => {
            // Chuyển đổi cả tên học sinh và tên tìm kiếm thành chữ thường để tìm kiếm không phân biệt chữ hoa chữ thường
            const studentName = student.fullName.toLowerCase();
            const searchName = name.toLowerCase();
            // Kiểm tra xem tên của học sinh có chứa tên tìm kiếm không
            return studentName.includes(searchName);
        });

        // Trả về danh sách học sinh đã lọc
        return filteredStudents;
    }
    // Hàm validate họ và tên học sinh
    validateFullName = (fullName) => {
        let regex = /^[a-zA-Z\s]+$/;
        return regex.test(fullName) && fullName.trim() !== "";
    }

    // Hàm validate ngày sinh
    validateBirthDay = (birthDay) => {
        let selectedDate = new Date(birthDay);
        let currentDate = new Date();
        return selectedDate < currentDate;
    }

    // Hàm validate select
    validateSelect = (selectValue) => {
        return selectValue && selectValue.trim() !== "";
    }

    // Hàm validate điểm số
    validateScore = (score) => {
        if (!score) {
            return false;
        }
        let regex = /^\d{1,2}(\.\d{1,2})?$/;
        return regex.test(score) && parseFloat(score) >= 0 && parseFloat(score) <= 10;
    }
    validateForm() {
        let valid = true;
        if (!this.validateFullName($('#fullName').val())) {
            $('#fullNameError').text('Họ và tên học sinh không được bỏ trống, chỉ chứa các ký tự alphabet và khoảng trắng');
            valid = false;

        }
        if (!this.validateBirthDay($('#birthDay').val())) {
            $('#birthDayError').text('Ngày sinh phải nhỏ hơn ngày hiện tại');
            valid = false;

        }
        if (!this.validateSelect($('#classRoomBlock').val())) {
            $('#classRoomBlockError').text('Vui lòng chọn khối lớp học');
            valid = false;

        }
        if (!this.validateSelect($('#classRoom').val())) {
            $('#classRoomError').text('Vui lòng chọn lớp học');
            valid = false;

        }
        if (!this.validateScore($('#mathScores').val())) {
            $('#mathScoresError').text('Điểm toán không hợp lệ, chỉ chứa các số từ 0 đến 10 và tối đa 2 chữ số sau dấu phẩy');
            valid = false;

        }
        if (!this.validateScore($('#physicsScores').val())) {
            $('#physicsScoresError').text('Điểm lý không hợp lệ, chỉ chứa các số từ 0 đến 10 và tối đa 2 chữ số sau dấu phẩy');
            valid = false;

        }
        if (!this.validateScore($('#chemistryScores').val())) {
            $('#chemistryScoresError').text('Điểm hóa không hợp lệ, chỉ chứa các số từ 0 đến 10 và tối đa 2 chữ số sau dấu phẩy');
            valid = false;
        }
        return valid;
    }



}
class LocalStorageHandler {
    constructor(storageKey) {
        this.storageKey = storageKey;
    }

    // Get data from local storage
    getData() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }


    // Save data to local storage
    saveData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Add a new item to local storage
    addItem(item) {
        const data = this.getData();
        data.push(item);
        this.saveData(data);
    }

    // Delete an item from local storage by index
    deleteItem(index) {
        const data = this.getData();
        data.splice(index, 1);
        this.saveData(data);
    }

    // Update an item in local storage by index
    updateItem(index, newItem) {
        const data = this.getData();
        data[index] = newItem;
        this.saveData(data);
    }
}

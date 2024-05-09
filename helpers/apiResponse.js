class ApiResponse {
  constructor(data, message, status, success) {
    this.data = data;
    this.message = message;
    this.status = status;
    this.success = success;
  }
}

module.exports = ApiResponse;

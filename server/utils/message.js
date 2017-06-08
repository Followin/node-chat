class Message {
  constructor(from, text) {
    this.from = from;
    this.text = text;
    this.createdAt = new Date();
  }
}

module.exports = {
  Message
};
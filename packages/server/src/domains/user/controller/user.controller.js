"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
var getProfile = function (req, res) {
    res.json(req.user);
};
exports.getProfile = getProfile;
exports.default = {
    getProfile: exports.getProfile,
};
//# sourceMappingURL=user.controller.js.map
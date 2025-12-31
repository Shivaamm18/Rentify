const express = require('express');
const { searchProperties, getPropertySuggestions, getSearchFilters } = require('../controllers/searchController');

const router = express.Router();

router.route('/')
  .get(searchProperties);

router.route('/suggestions')
  .get(getPropertySuggestions);

router.route('/filters')
  .get(getSearchFilters);

module.exports = router;
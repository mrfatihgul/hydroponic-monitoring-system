/**
 * @typedef {Object} SensorReadingDto
 * @property {number} id
 * @property {string} timestamp
 * @property {number} ph
 * @property {number} ec
 * @property {number} temperature
 * @property {number} humidity
 * @property {number} waterLevel
 */

/**
 * @typedef {Object} PlantBatchDto
 * @property {number} id
 * @property {string} cropName
 * @property {string} startDate
 * @property {number} plantCount
 * @property {string} [notes]
 */

/**
 * @typedef {Object} SystemEventDto
 * @property {number} id
 * @property {string} timestamp
 * @property {string} type
 * @property {string} message
 * @property {string} severity
 */

/**
 * @typedef {Object} AnalyticsSummaryDto
 * @property {number|null} averagePh
 * @property {number|null} averageEc
 * @property {number|null} averageTemperature
 * @property {number|null} averageHumidity
 * @property {number|null} averageWaterLevel
 * @property {number} criticalAlertCount
 * @property {number|null} stabilityScore
 * @property {number|null} estimatedDailyWaterUsage
 * @property {number} totalReadingCount
 */

export {};

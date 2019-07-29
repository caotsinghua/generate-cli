module.exports={
	"babel": {
		"presets": [
			"@babel/preset-react",
			[
				"@babel/preset-env",
				{
					"targets": {
						"node": true
					}
				}
			]
		]
	}
}

const HttpError = require('../models/http-error');
const Transaction = require('../models/transaction');

exports.getHoldings = async (req, res, next) => {
  holdings = await Transaction.aggregate([
    {
      $addFields: {
        total: {
          $sum: {
            $map: {
              input: '$items',
              in: {
                $mergeObjects: [
                  '$$this',
                  {
                    total: {
                      round: [
                        { $multiply: ['$$this.price', '$$this.quantity'] },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    holdings,
  });
};

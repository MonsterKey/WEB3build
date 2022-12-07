import axios from 'axios'

const url = "https://beta.api.hyperspace.xyz/graphql"
let data = {
    "operationName": "GetMarketPlaceSnapshots",
    "variables": {
        "condition": {
            "has_metadata": true,
            "project_ids": [
                {
                    "project_id": "DihfwK9NDTPELwmLdKAXYPF3v9HkuKozYXnVMesoWnWT"
                }
            ],
            "filter_pool_listings": false
        },
        "order_by": {
            "field_name": "lowest_listing_block_timestamp",
            "sort_order": "DESC"
        },
        "pagination_info": {
            "page_number": 2,
            "page_size": 30,
            "progressive_load": true
        }
    },
    "query": "query GetMarketPlaceSnapshots($condition: GetMarketPlaceSnapshotCondition, $pagination_info: PaginationConfig, $order_by: [OrderConfig!]) {\n  getMarketPlaceSnapshots(\n    condition: $condition\n    pagination_info: $pagination_info\n    order_by: $order_by\n  ) {\n    market_place_snapshots {\n      token_address\n      project_id\n      name\n      owner\n      rank_est\n      moonrank\n      howrare_rank\n      supply\n      full_img\n      meta_data_img\n      meta_data_uri\n      attributes\n      floor_price\n      floor_price_1day_change\n      project_name\n      project_image\n      valuation_date\n      valuation_price\n      is_project_verified\n      project_attributes {\n        name\n        counts\n        type\n        values\n        __typename\n      }\n      lowest_listing_mpa {\n        user_address\n        price\n        marketplace_program_id\n        type\n        signature\n        amount\n        broker_referral_address\n        block_timestamp\n        broker_referral_fee\n        escrow_address\n        currency\n        currency_price\n        decimal\n        fee\n        marketplace_fee_address\n        marketplace_instance_id\n        metadata\n        is_cross_mint_verified\n        twitter\n        __typename\n      }\n      last_sale_mpa {\n        user_address\n        price\n        marketplace_program_id\n        type\n        amount\n        signature\n        block_timestamp\n        __typename\n      }\n      highest_bid_mpa {\n        marketplace_fee_address\n        fee\n        escrow_address\n        broker_referral_fee\n        broker_referral_address\n        block_timestamp\n        signature\n        amount\n        currency\n        currency_price\n        decimal\n        type\n        marketplace_program_id\n        marketplace_instance_id\n        price\n        user_address\n        metadata\n        __typename\n      }\n      __typename\n    }\n    pagination_info {\n      current_page_number\n      current_page_size\n      has_next_page\n      total_page_number\n      __typename\n    }\n    __typename\n  }\n}"
}

axios.post(`${url}`,data)
    .then(res=>{
        console.log('res=>',res);
    })
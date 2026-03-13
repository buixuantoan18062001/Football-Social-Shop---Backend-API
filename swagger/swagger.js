const { z } = require("zod")
const {
  extendZodWithOpenApi,
  OpenAPIRegistry,
  OpenApiGeneratorV3
} = require("@asteasolutions/zod-to-openapi")

extendZodWithOpenApi(z)

const registry = new OpenAPIRegistry()

/* =====================
   SECURITY
===================== */

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT"
})

/* =====================
   COMMON
===================== */

const IdParam = z.object({
  id: z.string().openapi({
    example: "664a12f23ab123456789abcd"
  })
})

const PaginationQuery = z.object({
  page: z.string().optional(),
  limit: z.string().optional()
})

/* =====================
   AUTH SCHEMA
===================== */

const RegisterSchema = registry.register(
  "Register",
  z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
  })
)

const LoginSchema = registry.register(
  "Login",
  z.object({
    email: z.string().email(),
    password: z.string()
  })
)

const TokenSchema = registry.register(
  "Token",
  z.object({
    token: z.string()
  })
)



/* =====================
   USER
===================== */

const UserSchema = registry.register(
  "User",
  z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string()
  })
)

/* =====================
   AUTH API
===================== */

registry.registerPath({
  method: "post",
  path: "/api/auth/register",
  tags: ["Auth"],
  summary: "Register user",
  request: {
    body: {
      content: {
        "application/json": { schema: RegisterSchema }
      }
    }
  },
  responses: { 201: { description: "User created" } }
})

registry.registerPath({
  method: "post",
  path: "/api/auth/login",
  tags: ["Auth"],
  summary: "Login",
  request: {
    body: {
      content: {
        "application/json": { schema: LoginSchema }
      }
    }
  },
  responses: {
    200: {
      description: "JWT token",
      content: {
        "application/json": { schema: TokenSchema }
      }
    }
  }
})


registry.registerPath({
  method: "get",
  path: "/api/auth/profile",
  tags: ["Auth"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      content: {
        "application/json": { schema: UserSchema }
      }
    }
  }
})

registry.registerPath({
 method: "put",
 path: "/api/auth/profile",
 tags: ["Auth"],
 security: [{ bearerAuth: [] }],

 request: {
  body: {
   content: {
    "application/json": {
     schema: z.object({
      name: z.string().optional(),
      email: z.string().email().optional()
     })
    }
   }
  }
 },

 responses: {
  200: {
   description: "Profile updated"
  }
 }
});

registry.registerPath({

 method: "delete",

 path: "/api/auth/profile",

 tags: ["Auth"],

 security: [{ bearerAuth: [] }],

 responses: {

  200: {
   description: "Account deleted successfully"
  },

  401: {
   description: "Unauthorized"
  }

 }

});

// changePassword
registry.registerPath({
 method:"patch",
 path:"/api/auth/profile/password",
 tags:["Auth"],
 security:[{ bearerAuth: [] }],

 request:{
  body:{
   content:{
    "application/json":{
     schema:z.object({
      currentPassword:z.string(),
      newPassword:z.string()
     })
    }
   }
  }
 },

 responses:{
  200:{description:"Password updated"}
 }
});


// chuyển user thành admin
registry.registerPath({

 method:"patch",

 path:"/api/users/{id}/role",

 tags:["Admin"],

 security:[{ bearerAuth: [] }],

 request:{

  params:z.object({
   id:z.string()
  }),

  body:{
   content:{
    "application/json":{
     schema:z.object({
      role:z.enum(["user","admin"])
     })
    }
   }
  }

 },
 responses:{
  200:{description:"User role updated"},
  404:{description:"User not found"}
 }

});

// Admin Dashboard Stats
registry.registerPath({
 method:"get",
 path:"/api/users/stats",
 tags:["Admin"],
 security:[{ bearerAuth: [] }],

 responses:{
  200:{
   description:"Dashboard stats"
  }
 }
});


/* =====================
   USER API
===================== */


registry.registerPath({
  method: "get",
  path: "/api/users",
  tags: ["Users"],
  security: [{ bearerAuth: [] }],

  request: {
    query: z.object({
      search: z.string().optional().describe("Search by name or email"),
      sort: z.string().optional().describe("Sort fields. Example: name,-createdAt"),
      page: z.string().optional().describe("Page number"),
      limit: z.string().optional().describe("Items per page")
    })
  },

  responses: {
    200: {
      description: "List of users",
      content: {
        "application/json": {
          schema: UserSchema.array()
        }
      }
    }
  }
});

registry.registerPath({
  method: "put",
  path: "/api/users/{id}",
  tags: ["Users"],
  security: [{ bearerAuth: [] }],

  request: {
    params: z.object({
      id: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            name: z.string().optional(),
            email: z.string().email().optional()
          })
        }
      }
    }
  },

  responses: {
    200: {
      description: "User updated"
    },
    404: {
      description: "User not found"
    }
  }
});

registry.registerPath({
  method: "delete",
  path: "/api/users/{id}",
  tags: ["Users"],
  security: [{ bearerAuth: [] }],
  request: { params: IdParam },
  responses: { 200: { description: "User deleted" } }
})


// USER COMMENT

const CommentResponse = z.object({
  _id: z.string(),
  content: z.string(),
  likesCount: z.number(),
  parent: z.string().nullable(),

  user: z.object({
    _id: z.string(),
    email: z.string()
  }),

  createdAt: z.string()
});


/* =====================
   PRODUCT
===================== */

const ProductSchema = registry.register(
  "Product",
  z.object({
    _id: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    stock: z.number().optional()
  })
)

const CreateProductSchema = registry.register(
  "CreateProduct",
  z.object({
    name: z.string(),
    price: z.number(),
    description: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    stock: z.number().optional()
  })
)

registry.registerPath({
  method: "get",
  path: "/api/products",
  tags: ["Products"],

  request: {
    query: z.object({
      search: z.string().optional(),
      minPrice: z.string().optional(),
      maxPrice: z.string().optional(),
      sort: z.string().optional(),
      order: z.enum(["asc","desc"]).optional(),
      page: z.string().optional(),
      limit: z.string().optional()
    })
  },

  responses: {
    200: {
      description: "List products"
    }
  }
});


registry.registerPath({
  method: "get",
  path: "/api/products/{id}",
  tags: ["Products"],

  request: {
    params: IdParam
  },

  responses: {
    200: {
      description: "Product detail",
      content: {
        "application/json": {
          schema: ProductSchema
        }
      }
    },
    404: {
      description: "Product not found"
    }
  }
});

registry.registerPath({
  method: "post",
  path: "/api/products",
  tags: ["Products"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": { schema: CreateProductSchema }
      }
    }
  },
  responses: { 201: { description: "Product created" } }
})

registry.registerPath({
  method: "put",
  path: "/api/products/{id}",
  tags: ["Products"],
  security: [{ bearerAuth: [] }],
  request: {
    params: IdParam,
    body: {
      content: {
        "application/json": { schema: CreateProductSchema }
      }
    }
  },
  responses: { 200: { description: "Product updated" } }
})

registry.registerPath({
  method: "delete",
  path: "/api/products/{id}",
  tags: ["Products"],
  security: [{ bearerAuth: [] }],
  request: { params: IdParam },
  responses: { 200: { description: "Product deleted" } }
})

// Product Rating
registry.registerPath({
 method:"post",
 path:"/api/products/{id}/rating",
 tags:["Products"],
 security:[{ bearerAuth: [] }],

 request:{
  params:z.object({
   id:z.string()
  }),
  body:{
   content:{
    "application/json":{
     schema:z.object({
      rating:z.number().min(1).max(5)
     })
    }
   }
  }
 },

 responses:{
  200:{
   description:"Product rated"
  }
 }
});

// API Trending Products
registry.registerPath({
 method: "get",
 path: "/api/products/trending",
 tags: ["Products"],

 responses: {
  200: {
   description: "Trending products"
  }
 }
});

//API Trending Products

registry.registerPath({
 method: "post",
 path: "/api/products/{id}/like",
 tags: ["Products"],

 security: [{ bearerAuth: [] }],

 request: {
  params: z.object({
   id: z.string()
  })
 },

 responses: {
  200: {
   description: "Product liked"
  },

  404: {
   description: "Product not found"
  }
 }
});

/* =====================
   ARTICLE API
===================== */

const ArticleSchema = registry.register(
  "Article",
  z.object({
    _id: z.string(),
    title: z.string(),
    content: z.string(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    author: z.string(),
    likes: z.number(),
    createdAt: z.string()
  })
)

const CreateArticleSchema = registry.register(
  "CreateArticle",
  z.object({
    title: z.string(),
    content: z.string(),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
  })
)

const UpdateArticleSchema = registry.register(
  "UpdateArticle",
  z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
  })
)



/* =====================
   ARTICLES
===================== */

registry.registerPath({
  method: "get",
  path: "/api/articles",
  tags: ["Articles"],

  request: {
    query: z.object({
      search: z.string().optional().describe("Search article title"),
      sort: z.string().optional().describe("Sort fields. Example: createdAt,-views"),
      page: z.string().optional().describe("Page number"),
      limit: z.string().optional().describe("Items per page")
    })
  },

  responses: {
    200: {
      description: "List of articles",
      content: {
        "application/json": {
          schema: ArticleSchema.array()
        }
      }
    }
  }
});

registry.registerPath({
  method: "post",
  path: "/api/articles",
  tags: ["Articles"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": { schema: CreateArticleSchema }
      }
    }
  },
  responses: { 201: { description: "Article created" } }
})

registry.registerPath({
  method: "put",
  path: "/api/articles/{id}",
  tags: ["Articles"],
  security: [{ bearerAuth: [] }],
  request: {
    params: IdParam,
    body: {
      content: {
        "application/json": { schema: UpdateArticleSchema }
      }
    }
  },
  responses: { 200: { description: "Article updated" } }
})

registry.registerPath({
  method: "delete",
  path: "/api/articles/{id}",
  tags: ["Articles"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: {
      description: "Article deleted"
    }
  }
});
registry.registerPath({
  method: "post",
  path: "/api/articles/{id}/like",
  tags: ["Articles"],
  security: [{ bearerAuth: [] }],
  request: { params: IdParam },
  responses: { 200: { description: "Article liked" } }
})

// trending articles
registry.registerPath({
 method:"get",
 path:"/api/articles/trending",
 tags:["Articles"],

 responses:{
  200:{
   description:"Trending articles"
  }
 }
});

/* =====================
   CART
===================== */

const CartItemSchema = registry.register(
  "CartItem",
  z.object({
    productId: z.string(),
    quantity: z.number()
  })
)

const CartSchema = registry.register(
  "Cart",
  z.object({
    _id: z.string(),
    userId: z.string(),
    items: CartItemSchema.array(),
    createdAt: z.string(),
    updatedAt: z.string()
  })
)


registry.registerPath({
  method: "get",
  path: "/api/cart",
  tags: ["Cart"],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      content: {
        "application/json": { schema: CartSchema }
      }
    }
  }
})

registry.registerPath({
  method: "post",
  path: "/api/cart",
  tags: ["Cart"],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": { schema: CartItemSchema }
      }
    }
  },
  responses: { 200: { description: "Cart updated" } }
})

registry.registerPath({
  method: "delete",
  path: "/api/cart/{id}",
  tags: ["Cart"],
  security: [{ bearerAuth: [] }],
  request: { params: IdParam },
  responses: { 200: { description: "Item removed" } }
})




/* =====================
   ORDER
===================== */

// ================= ORDER SCHEMA =================

const OrderItemSchema = registry.register(
  "OrderItem",
  z.object({
    product: z.string().openapi({
      example: "68ac4a7acbc8cf27f7cae61b"
    }),

    quantity: z.number().openapi({
      example: 2
    }),

    price: z.number().openapi({
      example: 10
    })
  })
)

const CreateOrderSchema = registry.register(
  "CreateOrder",
  z.object({
    items: z.array(OrderItemSchema),

    address: z.string().openapi({
      example: "Ho Chi Minh City"
    })
  })
)

const OrderSchema = registry.register(
  "Order",
  z.object({
    _id: z.string(),

    user: z.string(),

    items: z.array(OrderItemSchema),

    total: z.number(),

    status: z.enum([
      "pending",
      "shipping",
      "completed"
    ]),

    address: z.string(),

    createdAt: z.string()
  })
)
// ================= CREATE ORDER =================

registry.registerPath({
  method: "post",
  path: "/api/orders",
  tags: ["Orders"],

  security: [{ bearerAuth: [] }],

  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateOrderSchema
        }
      }
    }
  },

  responses: {
    201: {
      description: "Order created successfully",

      content: {
        "application/json": {
          schema: OrderSchema
        }
      }
    }
  }
})

// ================= GET MY ORDERS =================

registry.registerPath({
  method: "get",
  path: "/api/orders/my-orders",
  tags: ["Orders"],

  security: [{ bearerAuth: [] }],

  responses: {
    200: {
      description: "List user orders",

      content: {
        "application/json": {
          schema: z.array(OrderSchema)
        }
      }
    }
  }
})

// ================= UPDATE ORDER =================

registry.registerPath({
  method: "put",
  path: "/api/orders/{id}",
  tags: ["Orders"],

  security: [{ bearerAuth: [] }],

  request: {
    params: z.object({
      id: z.string()
    }),

    body: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.enum([
              "pending",
              "shipping",
              "completed"
            ])
          })
        }
      }
    }
  },

  responses: {
    200: {
      description: "Order updated",

      content: {
        "application/json": {
          schema: OrderSchema
        }
      }
    }
  }
})
// ================= DELETE ORDER =================

registry.registerPath({
  method: "delete",
  path: "/api/orders/{id}",
  tags: ["Orders"],

  security: [{ bearerAuth: [] }],

  request: {
    params: z.object({
      id: z.string()
    })
  },

  responses: {
    200: {
      description: "Order deleted"
    }
  }
})



// PaginationComent Schema chung

const CommentPagination = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  comments: z.array(CommentResponse)
});


/* =====================
   ARTICLE COMMENTS
===================== */

// Create article comment
registry.registerPath({
  method: "post",
  path: "/api/article-comments/{articleId}",
  tags: ["Article Comments"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      articleId: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            content: z.string()
          })
        }
      }
    }
  },
  responses: {
    201: { description: "Article comment created" }
  }
});

// Get article comments
// paginationArticleComments


registry.registerPath({
  method: "get",
  path: "/api/article-comments/{articleId}",
  tags: ["Article Comments"],

  request: {
    params: z.object({
      articleId: z.string()
    }),

    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional()
    })
  },

  responses: {
    200: {
      description: "List article comments",
      content: {
        "application/json": {
          schema: CommentPagination
        }
      }
    }
  }
});

// Reply article comment
registry.registerPath({
  method: "post",
  path: "/api/article-comments/reply/{id}",
  tags: ["Article Comments"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            content: z.string()
          })
        }
      }
    }
  },
  responses: {
    201: { description: "Reply created" }
  }
});

// Get replies of article comment ⭐ NEW

registry.registerPath({
  method: "get",
  path: "/api/article-comments/reply/{id}",
  tags: ["Article Comments"],

  request: {
    params: z.object({
      id: z.string()
    }),

    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional()
    })
  },

  responses: {
    200: {
      description: "List replies of article comment",

      content: {
        "application/json": {
          schema: CommentPagination
        }
      }
    }
  }
});


// Like article comment
registry.registerPath({
  method: "post",
  path: "/api/article-comments/like/{id}",
  tags: ["Article Comments"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: { description: "Comment liked" }
  }
});

// Delete article comment
registry.registerPath({
  method: "delete",
  path: "/api/article-comments/{id}",
  tags: ["Article Comments"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: { description: "Comment deleted" }
  }
});





/* =====================
   PRODUCT COMMENTS
===================== */

// Create product comment
registry.registerPath({
  method: "post",
  path: "/api/product-comments/{productId}",
  tags: ["Product Comments"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      productId: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            content: z.string()
          })
        }
      }
    }
  },
  responses: {
    201: { description: "Product comment created" }
  }
});

// Get product comments
registry.registerPath({
  method: "get",
  path: "/api/product-comments/{productId}",
  tags: ["Product Comments"],
  request: {
    params: z.object({
      productId: z.string()
    })
  },
  responses: {
    200: { description: "List product comments" }
  }
});

// Reply product comment
registry.registerPath({
  method: "post",
  path: "/api/product-comments/reply/{id}",
  tags: ["Product Comments"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            content: z.string()
          })
        }
      }
    }
  },
  responses: {
    201: { description: "Reply created" }
  }
});

// Get replies of product comment
registry.registerPath({
  method: "get",
  path: "/api/product-comments/reply/{id}",
  tags: ["Product Comments"],

  request: {
    params: z.object({
      id: z.string()
    }),

    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional()
    })
  },

  responses: {
    200: {
      description: "List replies of comment",
      content: {
        "application/json": {
          schema: CommentPagination
        }
      }
    }
  }
});

// Like product comment
registry.registerPath({
  method: "post",
  path: "/api/product-comments/like/{id}",
  tags: ["Product Comments"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: { description: "Comment liked" }
  }
});

// Delete product comment
registry.registerPath({
  method: "delete",
  path: "/api/product-comments/{id}",
  tags: ["Product Comments"],
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.string()
    })
  },
  responses: {
    200: { description: "Comment deleted" }
  }
});

// paginationProductComments

registry.registerPath({
  method: "get",
  path: "/api/product-comments/{productId}",
  tags: ["Product Comments"],

  request: {
    params: z.object({
      productId: z.string()
    }),

    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional()
    })
  },

  responses: {
    200: {
      description: "List product comments",
      content: {
        "application/json": {
          schema: CommentPagination
        }
      }
    }
  }
});

/* =====================
   Payment
===================== */
registry.registerPath({
 method:"post",
 path:"/api/payment/create",
 tags:["Payment"],
 security:[{ bearerAuth: [] }],

 request:{
  body:{
   content:{
    "application/json":{
     schema:z.object({
      orderId:z.string()
     })
    }
   }
  }
 },

 responses:{
  201:{
   description:"Payment created"
  }
 }
});

registry.registerPath({
 method:"post",
 path:"/api/payment/confirm",
 tags:["Payment"],
 security:[{ bearerAuth: [] }],

 request:{
  body:{
   content:{
    "application/json":{
     schema:z.object({
      paymentId:z.string()
     })
    }
   }
  }
 },

 responses:{
  200:{
   description:"Payment successful"
  }
 }
});


registry.registerPath({
 method:"get",
 path:"/api/payment/my",
 tags:["Payment"],
 security:[{ bearerAuth: [] }],

 responses:{
  200:{
   description:"List user payments"
  }
 }
});


/* =====================
   UPLOAD
===================== */

/* =====================
   UPLOAD PROFILE IMAGE
===================== */

registry.registerPath({
 method: "post",
 path: "/api/upload/profile-image",
 tags: ["Upload"],
 security: [{ bearerAuth: [] }],

 request: {
  body: {
   required: true,
   content: {
    "multipart/form-data": {
     schema: {
      type: "object",
      properties: {
       file: {
        type: "string",
        format: "binary"
       }
      }
     }
    }
   }
  }
 },

 responses: {
  200: {
   description: "Profile image uploaded"
  }
 }
});

/* =====================
   UPLOAD PROFILE IMAGE
===================== */

registry.registerPath({
 method: "post",
 path: "/api/upload/profile-image",
 tags: ["Upload"],
 security: [{ bearerAuth: [] }],

 request: {
  body: {
   required: true,
   content: {
    "multipart/form-data": {
     schema: {
      type: "object",
      properties: {
       file: {
        type: "string",
        format: "binary"
       }
      }
     }
    }
   }
  }
 },

 responses: {
  200: {
   description: "Profile image uploaded"
  }
 }
});

/* =====================
   UPDATE PROFILE IMAGE
===================== */

registry.registerPath({
 method: "put",
 path: "/api/upload/profile-image",
 tags: ["Upload"],
 security: [{ bearerAuth: [] }],

 request: {
  body: {
   required: true,
   content: {
    "multipart/form-data": {
     schema: {
      type: "object",
      properties: {
       file: {
        type: "string",
        format: "binary"
       }
      }
     }
    }
   }
  }
 },

 responses: {
  200: {
   description: "Profile image updated"
  }
 }
});

/* =====================
   DELETE PROFILE IMAGE
===================== */

registry.registerPath({
 method: "delete",
 path: "/api/upload/profile-image",
 tags: ["Upload"],
 security: [{ bearerAuth: [] }],

 responses: {
  200: {
   description: "Profile image deleted"
  }
 }
});

/* =====================
   GENERATE DOC
===================== */

const generator = new OpenApiGeneratorV3(registry.definitions)

const swaggerDoc = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "Tin Tức + Shop Data",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:4000"
    }
  ]
})

module.exports = swaggerDoc
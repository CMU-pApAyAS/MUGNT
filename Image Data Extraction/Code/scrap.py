import tensorflow as tf
import pandas as pd

def generate_model():

    #Given tthat all of the maps come from the same source,
    #We do not mind overfitting to road data.
    #So there is no harm in using a large network.
    return tf.keras.Sequential([
        tf.keras.Input(shape = (3,)),
        tf.keras.layers.Dense(128, activation = 'relu'),
        tf.keras.layers.Dense(256, activation = 'relu'),
        tf.keras.layers.Dense(1, activation = 'sigmoid')
    ])

model = generate_model()

model.compile(optimizer = tf.keras.optimizers.Adam(), 
              loss = tf.keras.losses.BinaryCrossentropy,
              metrics = 'accuracy')


train_filepath = './roads.txt'
train_df = pd.read_csv(train_df)

input_cols = list(train_df.columns)[0:-1]
#RGB features
#Last is target
target_cols ='target'
inputs_df = train_df[input_cols].copy()
targets = train_df[target_cols]


model.fit(inputs_df, targets, epochs = 500)




#These are the road coordinates
#Reshape to image dimensions
background_mask = np.asarray(model.predict(test_df)).reshape(N, M))



#Creating Roads.txt


#Array_name = roads
df = pd.DataFrame(roads, "Red", "Green", "Blue")
df['target'] = arr

df.to_csv('roads.txt')